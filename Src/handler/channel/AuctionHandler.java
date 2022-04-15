/*
 * Tespia Project
 * ==================================
 * 스마이트 smite_demolition@nate.com
 * ==================================
 *
 */
package handler.channel;

import launch.Start;
import client.MapleCharacter;
import client.MapleClient;
import client.items.Equip;
import client.items.Item;
import client.items.ItemFactory;
import client.items.ItemFlag;
import client.items.MapleInventoryType;
import constants.GameConstants;
import database.MYSQL;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import launch.Start;

import packet.creators.PacketProvider;
import packet.opcode.SendPacketOpcode;
import packet.transfer.read.ReadingMaple;
import packet.transfer.write.WritingPacket;
import server.items.InventoryManipulator;
import server.items.ItemInformation;

public class AuctionHandler {

    public static final void Handle(final ReadingMaple rh, final MapleClient c, byte op) {
        switch (op) {
            case 0: { // 아이템 로드
                c.getSession().writeAndFlush(AuctionPacket.showItemList(WorldAuction.getItems(c.getPlayer()), false));
                break;
            }
            case 1: { // 판매 등록
                final boolean isbargain = rh.readInt() > 0;
                final int itemid = rh.readInt();
                final int quantity = rh.readInt();
                final long bid = rh.readLong();
                final long meso = rh.readLong() * quantity;
                final int time = rh.readInt();
                final byte inv = rh.readByte();
                final short slot = rh.readShort();
                Item item = (Item) c.getPlayer().getInventory(MapleInventoryType.getByType(inv)).getItem(slot), copyItem;
                if (c.getPlayer().getMeso() < 2000) {
                    c.getSession().writeAndFlush(AuctionPacket.AuctionMessage((byte) 1, (byte) 3));
                    return;
                }
                if (item == null || item.getItemId() != itemid || item.getQuantity() < quantity) {
                    c.getPlayer().dropMessage(1, "오류가 발생했습니다.");
                    return;
                }
                boolean isPremiumUser = AuctionHandler.WorldAuction.isPremiumUser(c.getPlayer());
                int limitCount = isPremiumUser ? 20 : 10;
                if (AuctionHandler.WorldAuction.getSellAllItemsCount(c.getPlayer().getId()) >= limitCount) {
                    c.getSession().writeAndFlush(AuctionHandler.AuctionPacket.AuctionMessage((byte) 1, (byte) 4));
                    return;
                }
                copyItem = (Item) item.copy();
                copyItem.setQuantity((short) quantity);
                AuctionItemPackage aitem = new AuctionItemPackage(c.getPlayer().getId(), c.getPlayer().getName(), copyItem, bid, meso, System.currentTimeMillis() + (time * 60 * 60 * 1000), isbargain, 0, 0, System.currentTimeMillis(), 0);
                WorldAuction.addItem(aitem);
                c.getPlayer().gainMeso(-2000, true); // 보증금
                c.getSession().writeAndFlush(AuctionPacket.AuctionMessage((byte) 1, (byte) 0));
                c.getSession().writeAndFlush(AuctionPacket.AuctionSell(WorldAuction.getSellItems(c.getPlayer().getId())));
                InventoryManipulator.removeFromSlot(c, MapleInventoryType.getByType(inv), slot, (short) quantity, false);
                WorldAuction.addAuction(c.getPlayer().getId(), bid, item.getInventoryId(), (byte) 0);
                break;
            }
            case 2: { //아이템 등록 취소
                AuctionItemPackage item = WorldAuction.findByIid(rh.readInt());
                final int status = 4;
                if (item == null) {
                    c.getPlayer().dropMessage(1, "오류가 발생했습니다.");
                    return;
                }
                if (status == 1) {
                    c.getPlayer().gainMeso(WorldAuction.getBidById(c.getPlayer().getId(), item.getItem().getInventoryId()), true);
                } else if (status == 3) {
                    c.getPlayer().gainMeso(item.getBid(), true);
                } else if (status == 2 || status == 4) {
                    //InventoryManipulator.addbyItem(c, item.getItem());
                    c.getPlayer().gainMeso(2000, true); // 보증금 돌려줌
                }

                item.setBuyTime(System.currentTimeMillis());

                boolean isOnwer = c.getPlayer().getId() == item.getOwnerId();
                if (status != 1) {
                    item.setType(status == 2 ? (item.getType(isOnwer, true) == 18 ? 27 : 17) : status == 3 ? (item.getType(isOnwer, true) == 17 ? 28 : 18) : status == 4 ? 4 : 0);
                }
                c.getSession().writeAndFlush(AuctionPacket.AuctionSell(WorldAuction.getSellItems(c.getPlayer().getId())));
                c.getSession().writeAndFlush(AuctionPacket.updateAuctionHistory(WorldAuction.getCompleteItems(c.getPlayer().getId()), c.getPlayer().getName(), c.getPlayer().getId()));
                c.getSession().writeAndFlush(AuctionPacket.AuctionMessage((byte) 2, (byte) 0));
                break;
            }
            case 3: {
                final int id = rh.readInt();
                final long meso = rh.readLong();
                AuctionItemPackage item = WorldAuction.findByIid(id);
                if (item == null) {
                    c.getPlayer().dropMessage(1, "오류가 발생했습니다.");
                    return;
                }
                if (c.getPlayer().getMeso() < meso) {
                    c.getSession().writeAndFlush(AuctionPacket.AuctionMessage((byte) 3, (byte) 4));
                    return;
                }
                if (item.getOwnerId() == c.getPlayer().getId() || item.getBuyer() != 0) {
                    c.getSession().writeAndFlush(AuctionPacket.AuctionMessage((byte) 3, (byte) 3));
                    return;
                }
                boolean isPremiumUser = AuctionHandler.WorldAuction.isPremiumUser(c.getPlayer());
                int limitCount = isPremiumUser ? 20 : 10;
                if (AuctionHandler.WorldAuction.getBuyAllItemsCount(c.getPlayer().getId()) >= limitCount) {
                    c.getSession().writeAndFlush(AuctionHandler.AuctionPacket.AuctionMessage((byte) 3, (byte) 5));
                    return;
                }
                c.getPlayer().gainMeso(-meso, true);
                item.setBuyer(c.getPlayer().getId());
                item.setBuyTime(System.currentTimeMillis());
                item.setType(2);
                c.getSession().writeAndFlush(AuctionPacket.AuctionSell(WorldAuction.getSellItems(c.getPlayer().getId())));
                c.getSession().writeAndFlush(AuctionPacket.updateAuctionHistory(WorldAuction.getCompleteItems(c.getPlayer().getId()), c.getPlayer().getName(), c.getPlayer().getId()));
                c.getSession().writeAndFlush(AuctionPacket.AuctionMessage((byte) 3, (byte) 0));
                c.getSession().writeAndFlush(AuctionPacket.AuctionBuy(item, meso, 2));
                break;
            }
            case 4: {
                final int id = rh.readInt();
                final int type = rh.readInt();
                //1 = 입찰금 반환, 2 = 물품 수령, 3 = 대금 수령, 4 = 물품 반환 (미판매) , 5 = 입찰금 반환 (차액 발생) , 6 = 수령 완료(상회입찰), 7 = 수령 완료(낙찰), 8 = 수령 완료 (판매 완료), 9 = 수령 완료 (미판매), 10 = 수령 완료 (차액 발생)
                final long meso = rh.readLong();
                AuctionItemPackage item = WorldAuction.findByIid(id);
                /* if (item == null || c.getPlayer().getMeso() < meso) {
                    c.getPlayer().dropMessage(1, "오류가 발생했습니다.");
                    return;
                }*/
                item.setBuyer(c.getPlayer().getId());
                item.setBuyTime(System.currentTimeMillis());
                item.setType(type == 2 ? 8 : 0);
                c.getSession().writeAndFlush(AuctionPacket.AuctionSell(WorldAuction.getSellItems(c.getPlayer().getId())));
                c.getSession().writeAndFlush(AuctionPacket.updateAuctionHistory(WorldAuction.getCompleteItems(c.getPlayer().getId()), c.getPlayer().getName(), c.getPlayer().getId()));
                c.getSession().writeAndFlush(AuctionPacket.AuctionMessage((byte) 5, (byte) 0));
                c.getSession().writeAndFlush(AuctionPacket.AuctionBuy(item, meso, 2));
                break;
            }
            case 5: {
                final int id = rh.readInt();
                final long meso = rh.readLong();
                AuctionItemPackage item = WorldAuction.findByIid(id);
                if (item == null || c.getPlayer().getMeso() < meso) {
                    c.getPlayer().dropMessage(1, "오류가 발생했습니다.");
                    return;
                }
                item.setBuyer(999999);
                item.setBuyTime(System.currentTimeMillis());
                item.setType(0);
                WorldAuction.addAuction(c.getPlayer().getId(), meso, id, (byte) 0);
                c.getSession().writeAndFlush(AuctionPacket.AuctionSell(WorldAuction.getSellItems(c.getPlayer().getId())));
                c.getSession().writeAndFlush(AuctionPacket.updateAuctionHistory(WorldAuction.getCompleteItems(c.getPlayer().getId()), c.getPlayer().getName(), c.getPlayer().getId()));
                c.getSession().writeAndFlush(AuctionPacket.AuctionMessage((byte) 4, (byte) 0));
                c.getSession().writeAndFlush(AuctionPacket.AuctionBuy(item, meso, 1));
                break;
            }
            case 6: {
                final int id = rh.readInt();
                final int status = rh.readInt();
                //0 = 입찰,  1 = 입찰금 반환, 2 = 물품 수령, 3 = 대금 수령, 4 = 물품 반환 (미판매) , 5 = 입찰금 반환 (차액 발생) , 6 = 수령 완료(상회입찰), 7 = 수령 완료(낙찰), 8 = 수령 완료 (판매 완료), 9 = 수령 완료 (미판매), 10 = 수령 완료 (차액 발생)

                final long meso = rh.readLong();
                boolean isPremiumUser = AuctionHandler.WorldAuction.isPremiumUser(c.getPlayer());
                AuctionItemPackage item = WorldAuction.findByIid(id);
                if (item == null/* || item.getType(false, true) != status*/) {
                    c.getPlayer().dropMessage(1, "오류가 발생했습니다.");
                    return;
                }
                if (status == 1) {
                    c.getPlayer().gainMeso(WorldAuction.getBidById(c.getPlayer().getId(), id), true);
                } else if (status == 3) {
                    if (!(item.type == 2 || item.type == 17)) {
                        return;
                    }
                    c.getPlayer().gainMeso((long) Math.ceil(meso * (isPremiumUser ? 0.97 : 0.95)), true);
                } else if (status == 2 || status == 4) {
                    if (status == 2 && item.type != 2) {
                        return;
                    } else if (status == 4 && item.type != 4) {
                        return;
                    }
                    if (status == 2) {
                        short flag = item.getItem().getFlag();
                        if ((flag & ItemFlag.KARMA_EQ.getValue()) > 0) {
                            flag |= ItemFlag.UNTRADEABLE.getValue();
                            flag -= ItemFlag.KARMA_EQ.getValue();
                            item.getItem().setFlag(flag);
                        }
                    }
                    InventoryManipulator.addbyItem(c, item.getItem());
                } else if (status == 9) { // 보증금 되돌려줌
                    c.getPlayer().gainMeso(2000, true);
                }

                boolean isOnwer = c.getPlayer().getId() == item.getOwnerId();
                if (status != 1) {
                    item.setType(status == 2 ? (item.getType(isOnwer, true) == 18 ? 27 : 17) : status == 3 ? (item.getType(isOnwer, true) == 17 ? 28 : 18) : status == 4 ? 9 : 0);
                }
                c.getSession().writeAndFlush(AuctionPacket.AuctionSell(WorldAuction.getSellItems(c.getPlayer().getId())));
                c.getSession().writeAndFlush(AuctionPacket.updateAuctionHistory(WorldAuction.getCompleteItems(c.getPlayer().getId()), c.getPlayer().getName(), c.getPlayer().getId()));
                c.getSession().writeAndFlush(AuctionPacket.AuctionMessage((byte) 6, (byte) 0));
                c.getSession().writeAndFlush(AuctionPacket.AuctionBuy(item, meso, status == 1 ? 7 : 8));
                break;
            }
            case 7: { //검색
                List<AuctionItemPackage> allItem = WorldAuction.getItems(c.getPlayer());
                List<AuctionItemPackage> filter = new LinkedList<>();
                List<AuctionItemPackage> filter2 = new LinkedList<>();
                int equipDetailOpCount = rh.readInt();
                for (int i = 0; i < equipDetailOpCount; ++i) {
                    int option = rh.readInt(); // 세부 검색 옵션
                    int value = rh.readInt(); // 최소 수치
                    SearchManager.searchEquipDetailOption(option, value, i == 0 ? allItem : filter, filter);
                }
                int resultCount = rh.readInt();
                rh.skip(1); // 항상 1인듯
                for (int i = 0; i < resultCount; ++i) {
                    int itemId = rh.readInt();
                    if (equipDetailOpCount > 0) {
                        filter.stream().filter(item -> item.getItem().getItemId() == itemId).forEach(filter2::add);
                    } else {
                        allItem.stream().filter(item -> item.getItem().getItemId() == itemId).forEach(filter2::add);
                    }
                }
                long minPrice = rh.readLong();
                long maxPrice = rh.readLong();
                int minBundle = rh.readInt();
                int maxBundle = rh.readInt();
                int grade = (byte) rh.readByte();
                filter.clear();
                rh.skip(1);
                boolean isEquip = rh.readByte() == 1; // 0: 일반, 1: 장비
                rh.skip(1);
                //boolean isProtective = rh.readByte() == 1; // 0: 무기, 1: 방어구
                filter2.stream().filter(item -> item.mesos >= minPrice && (maxPrice > 0 ? (item.mesos <= maxPrice) : true))
                        .filter(item -> (minBundle > 0 ? (item.item.getQuantity() >= minBundle) : true && (maxBundle > 0 ? (item.item.getQuantity() <= maxBundle) : true)))
                        .filter(item -> grade != -1 ? (((((Equip) item.item).getState() == 0 && grade == 0) || (((Equip) item.item).getState() == 17 && grade == 1))
                        || (((Equip) item.item).getState() == 18 && grade == 2) || (((Equip) item.item).getState() == 19 && grade == 3)
                        || (((Equip) item.item).getState() == 20 && grade == 4)) : true)
                        .filter(item -> isEquip ? GameConstants.isEquip(item.item.getItemId()) : true)
                        //.filter(item -> isProtective ? !GameConstants.isWeapon(item.item.getItemId()) : true)
                        .forEach(filter::add);

                int itemType = rh.readInt(); // 0: 방어구, 1: 무기, 2: 소비, 3: 캐시, 4: 기타
                int itemClass = rh.readInt(); // 아이템 분류
                int normalDetailOp = rh.readInt(); // 세부 검색 (장비X)
                boolean useLevelSearch = rh.readByte() == 1;
                AtomicInteger minLevel = new AtomicInteger(0);
                AtomicInteger maxLevel = new AtomicInteger(250);
                if (useLevelSearch) {
                    minLevel.set(rh.readInt());
                    maxLevel.set(rh.readInt());
                }
                filter2.clear();
                ItemInformation ii = ItemInformation.getInstance();
                filter.stream().filter(item -> isEquip ? (ii.getReqLevel(item.item.getItemId()) >= minLevel.get() && ii.getReqLevel(item.item.getItemId()) <= maxLevel.get()) : true)
                        .forEach(filter2::add);

                // 결과값 출력
                c.getSession().writeAndFlush(AuctionPacket.showItemList(filter2, true));
                break;
            }
            case 8: { //판매 업데이트
                c.getSession().writeAndFlush(AuctionPacket.AuctionSell(WorldAuction.getSellItems(c.getPlayer().getId())));
                break;
            }
            case 9: { //완료 업데이트
                //c.getSession().writeAndFlush(AuctionPacket.showItemList(WorldAuction.getItems(c.getPlayer()), false));
                //c.getSession().writeAndFlush(AuctionPacket.AuctionSell(WorldAuction.getSellItems(c.getPlayer().getId())));
                c.getSession().writeAndFlush(AuctionPacket.updateAuctionHistory(WorldAuction.getCompleteItems(c.getPlayer().getId()), c.getPlayer().getName(), c.getPlayer().getId()));
                break;
            }
            case 10: {
                break;
            }
            case 11: { //흥정
                final int id = rh.readInt();
                final long meso = rh.readLong();
                final String bargaining = rh.readMapleAsciiString();
                AuctionItemPackage item = WorldAuction.findByIid(id);
                if (item == null || c.getPlayer().getMeso() < meso) {
                    c.getPlayer().dropMessage(1, "오류가 발생했습니다.");
                    return;
                }
                c.getSession().writeAndFlush(AuctionPacket.AuctionBargaining(item, meso, bargaining));
                break;
            }
            case 14: {
                WorldAuction.save();
                break;
            }
            default:
                System.out.println("not active : " + op + " / data : " + rh.toString() + "");
                break;
        }
    }

    public static class SearchManager {

        public static void searchEquipDetailOption(int option, int value, List<AuctionItemPackage> allItem_, List<AuctionItemPackage> filter) {
            final ItemInformation ii = ItemInformation.getInstance();
            List<AuctionItemPackage> allItem = new LinkedList<>(allItem_);
            filter.clear();
            switch (option) {
                case 0: // STR
                    allItem.stream().filter(item -> item.getItem().getType() == 1)
                            .filter(item -> ((Equip) item.getItem()).getStr() >= value).forEach(a -> {
                        if (!filter.contains(a)) {
                            filter.add(a);
                        }
                    });
                    break;
                case 1: // DEX
                    allItem.stream().filter(item -> item.getItem().getType() == 1)
                            .filter(item -> ((Equip) item.getItem()).getDex() >= value).forEach(a -> {
                        if (!filter.contains(a)) {
                            filter.add(a);
                        }
                    });
                    break;
                case 2: // INT
                    allItem.stream().filter(item -> item.getItem().getType() == 1)
                            .filter(item -> ((Equip) item.getItem()).getInt() >= value).forEach(a -> {
                        if (!filter.contains(a)) {
                            filter.add(a);
                        }
                    });
                    break;
                case 3: // LUK
                    allItem.stream().filter(item -> item.getItem().getType() == 1)
                            .filter(item -> ((Equip) item.getItem()).getLuk() >= value).forEach(a -> {
                        if (!filter.contains(a)) {
                            filter.add(a);
                        }
                    });
                    break;
                case 4: // 공격력
                    allItem.stream().filter(item -> item.getItem().getType() == 1)
                            .filter(item -> ((Equip) item.getItem()).getWatk() >= value).forEach(a -> {
                        if (!filter.contains(a)) {
                            filter.add(a);
                        }
                    });
                    break;
                case 5: // 마력
                    allItem.stream().filter(item -> item.getItem().getType() == 1)
                            .filter(item -> ((Equip) item.getItem()).getMatk() >= value).forEach(a -> {
                        if (!filter.contains(a)) {
                            filter.add(a);
                        }
                    });
                    break;
                case 6: // 보공 데미지
                    allItem.stream().filter(item -> item.getItem().getType() == 1)
                            .filter(item -> ((Equip) item.getItem()).getBossDamage() >= value).forEach(a -> {
                        if (!filter.contains(a)) {
                            filter.add(a);
                        }
                    });
                    break;
                case 7: // 몬스터 방어율 무시
                    allItem.stream().filter(item -> item.getItem().getType() == 1)
                            .filter(item -> ((Equip) item.getItem()).getIgnoreWdef() >= value).forEach(a -> {
                        if (!filter.contains(a)) {
                            filter.add(a);
                        }
                    });
                    break;
                case 8: // 보공 데미지 %증가
                {
                    int[] potentials = new int[]{601, 602, 603, 604, 30601, 30602, 32601, 40601, 40602, 40603, 42601, 42602, 60003, 60011, 60024, 60039}; // 보스 공격시 데미지 증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    for (int next = 0; next < potentials.length; ++next) {
                                        if (e.getPotential1() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDAMr);
                                        }
                                        if (e.getPotential2() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDAMr);
                                        }
                                        if (e.getPotential3() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDAMr);
                                        }
                                        if (e.getPotential4() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDAMr);
                                        }
                                        if (e.getPotential5() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDAMr);
                                        }
                                        if (e.getPotential6() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDAMr);
                                        }
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 9: // 몬스터 방어율 무시
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).ignoreTargetDEF;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).ignoreTargetDEF;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).ignoreTargetDEF;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).ignoreTargetDEF;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).ignoreTargetDEF;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).ignoreTargetDEF;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 10: // 총 데미지 % 증가
                {
                    int[] potentials = new int[]{10070, 12070, 20070, 22070, 30070, 32070, 32071, 40070, 42070, 42071, 60001, 60009, 60037}; // 데미지 %
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    for (int next = 0; next < potentials.length; ++next) {
                                        if (e.getPotential1() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDAMr);
                                        }
                                        if (e.getPotential2() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDAMr);
                                        }
                                        if (e.getPotential3() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDAMr);
                                        }
                                        if (e.getPotential4() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDAMr);
                                        }
                                        if (e.getPotential5() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDAMr);
                                        }
                                        if (e.getPotential6() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDAMr);
                                        }
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 11: // 공격력 %증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPADr;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPADr;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPADr;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPADr;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPADr;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPADr;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 12: // 마력 %증가
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMADr;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMADr;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMADr;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMADr;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMADr;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMADr;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 13: // 올스탯 %증가
                {
                    int[] potentials = new int[]{391, 20086, 22086, 22087, 30086, 32086, 32087, 40086, 42086, 42087, 60002, 60004, 60005, 60038}; // 올스탯 : + #incSTRr%
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    for (int next = 0; next < potentials.length; ++next) {
                                        if (e.getPotential1() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRr);
                                        }
                                        if (e.getPotential2() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRr);
                                        }
                                        if (e.getPotential3() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRr);
                                        }
                                        if (e.getPotential4() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRr);
                                        }
                                        if (e.getPotential5() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRr);
                                        }
                                        if (e.getPotential6() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRr);
                                        }
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 14: // STR %증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRr;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRr;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRr;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRr;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRr;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRr;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 15: // DEX %증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEXr;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEXr;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEXr;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEXr;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEXr;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEXr;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 16: // INT %증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINTr;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINTr;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINTr;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINTr;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINTr;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINTr;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 17: // LUK %증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUKr;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUKr;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUKr;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUKr;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUKr;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUKr;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 18: // 크리티컬 확률 증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCr;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCr;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCr;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCr;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCr;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCr;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 19: // 상태이상 지속 시간 감소
                {
                    int[] potentials = new int[]{20396}; // 모든 상태이상의 지속시간 : -#time초
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    for (int next = 0; next < potentials.length; ++next) {
                                        if (e.getPotential1() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).time);
                                        }
                                        if (e.getPotential2() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).time);
                                        }
                                        if (e.getPotential3() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).time);
                                        }
                                        if (e.getPotential4() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).time);
                                        }
                                        if (e.getPotential5() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).time);
                                        }
                                        if (e.getPotential6() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).time);
                                        }
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 20: // 상태 이상 내성 증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incAsrR;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incAsrR;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incAsrR;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incAsrR;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incAsrR;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incAsrR;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 21: // 모든 속성 내성 증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incTerR;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incTerR;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incTerR;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incTerR;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incTerR;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incTerR;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 22: // 크리티컬 최대 데미지 증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCriticaldamageMax;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCriticaldamageMax;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCriticaldamageMax;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCriticaldamageMax;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCriticaldamageMax;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCriticaldamageMax;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 23: // 크리티컬 최소 데미지 증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCriticaldamageMin;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCriticaldamageMin;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCriticaldamageMin;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCriticaldamageMin;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCriticaldamageMin;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incCriticaldamageMin;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 24: // 모든 스킬 재사용 대기시간 감소
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).reduceCooltime;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).reduceCooltime;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).reduceCooltime;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).reduceCooltime;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).reduceCooltime;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).reduceCooltime;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 25: // 기본옵션: 총 데미지 증가
                    allItem.stream().filter(item -> item.getItem().getType() == 1)
                            .filter(item -> ((Equip) item.getItem()).getAllDamageP() >= value).forEach(a -> {
                        if (!filter.contains(a)) {
                            filter.add(a);
                        }
                    });
                    break;
                case 26: // 기본옵션: 올스탯 %증가
                    allItem.stream().filter(item -> item.getItem().getType() == 1)
                            .filter(item -> ((Equip) item.getItem()).getAllStatP() >= value).forEach(a -> {
                        if (!filter.contains(a)) {
                            filter.add(a);
                        }
                    });
                    break;
                case 27: // 아이템 획득 확률 증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incRewardProp;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incRewardProp;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incRewardProp;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incRewardProp;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incRewardProp;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incRewardProp;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 28: // MaxHP %증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMHPr;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMHPr;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMHPr;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMHPr;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMHPr;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMHPr;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 29: // MaxMP %증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMMPr;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMMPr;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMMPr;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMMPr;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMMPr;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMMPr;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 30: // 기본옵션 : MaxHP
                    allItem.stream().filter(item -> item.getItem().getType() == 1)
                            .filter(item -> ((Equip) item.getItem()).getHpR() >= value).forEach(a -> {
                        if (!filter.contains(a)) {
                            filter.add(a);
                        }
                    });
                    break;
                case 31: // 기본옵션 : MaxMP
                    allItem.stream().filter(item -> item.getItem().getType() == 1)
                            .filter(item -> ((Equip) item.getItem()).getMpR() >= value).forEach(a -> {
                        if (!filter.contains(a)) {
                            filter.add(a);
                        }
                    });
                    break;
                case 32: // 공격력 증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPAD;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPAD;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPAD;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPAD;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPAD;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPAD;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 33: // 마력 증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMAD;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMAD;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMAD;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMAD;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMAD;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMAD;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                case 34: // 기본옵션: 착용 제한 레벨 감소
                    allItem.stream().filter(item -> item.getItem().getType() == 1)
                            .filter(item -> ((Equip) item.getItem()).getDownLevel() >= value).forEach(a -> {
                        if (!filter.contains(a)) {
                            filter.add(a);
                        }
                    });
                    break;
                case 35: // <쓸만한 헤이스트> 스킬
                {
                    int[] potentials = new int[]{31001};
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    for (int next = 0; next < potentials.length; ++next) {
                                        if (e.getPotential1() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential2() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential3() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential4() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential5() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential6() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 36: // <쓸만한 미스틱 도어> 스킬
                {
                    int[] potentials = new int[]{31002};
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    for (int next = 0; next < potentials.length; ++next) {
                                        if (e.getPotential1() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential2() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential3() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential4() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential5() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential6() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 37: // <쓸만한 샤프 아이즈> 스킬
                {
                    int[] potentials = new int[]{31003};
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    for (int next = 0; next < potentials.length; ++next) {
                                        if (e.getPotential1() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential2() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential3() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential4() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential5() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential6() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 38: // <쓸만한 하이퍼 바디> 스킬
                {
                    int[] potentials = new int[]{31004};
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    for (int next = 0; next < potentials.length; ++next) {
                                        if (e.getPotential1() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential2() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential3() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential4() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential5() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential6() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 39: // <쓸만한 컴뱃 오더스> 스킬
                {
                    int[] potentials = new int[]{41005};
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    for (int next = 0; next < potentials.length; ++next) {
                                        if (e.getPotential1() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential2() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential3() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential4() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential5() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential6() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 40: // <쓸만한 어드밴스트 블레스> 스킬
                {
                    int[] potentials = new int[]{41006};
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    for (int next = 0; next < potentials.length; ++next) {
                                        if (e.getPotential1() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential2() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential3() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential4() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential5() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential6() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 41: // <쓸만한 윈드 부스터> 스킬
                {
                    int[] potentials = new int[]{41007};
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    for (int next = 0; next < potentials.length; ++next) {
                                        if (e.getPotential1() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential2() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential3() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential4() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential5() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                        if (e.getPotential6() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).level);
                                        }
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 42: // 최대 데미지 제한 상승
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMaxDamage;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMaxDamage;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMaxDamage;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMaxDamage;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMaxDamage;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMaxDamage;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 43: // STR 증가
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTR;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTR;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTR;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTR;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTR;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTR;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 44: // DEX 증가
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEX;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEX;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEX;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEX;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEX;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEX;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 45: // INT 증가
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINT;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINT;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINT;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINT;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINT;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINT;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 46: { // LUK 증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUK;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUK;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUK;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUK;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUK;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUK;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 47: // MaxHP 증가
                {
                    allItem.stream()
                            .forEach(item -> {
                                Equip e = (Equip) item.getItem();
                                int val = 0;
                                if (e.getPotential1() > 0) {
                                    val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMHP;
                                }
                                if (e.getPotential2() > 0) {
                                    val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMHP;
                                }
                                if (e.getPotential3() > 0) {
                                    val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMHP;
                                }
                                if (e.getPotential4() > 0) {
                                    val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMHP;
                                }
                                if (e.getPotential5() > 0) {
                                    val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMHP;
                                }
                                if (e.getPotential6() > 0) {
                                    val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMHP;
                                }
                                if (val >= value) {
                                    filter.add(item);
                                }
                            });
                    break;
                }
                case 48: { // MaxMP 증가
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMMP;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMMP;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMMP;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMMP;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMMP;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMMP;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 49: // 올스탯 증가
                {
                    int[] potentials = new int[]{201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 10081, 12081, 12082, 40081};
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    for (int next = 0; next < potentials.length; ++next) {
                                        if (e.getPotential1() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTR);
                                        }
                                        if (e.getPotential2() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTR);
                                        }
                                        if (e.getPotential3() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTR);
                                        }
                                        if (e.getPotential4() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTR);
                                        }
                                        if (e.getPotential5() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTR);
                                        }
                                        if (e.getPotential6() == potentials[next]) {
                                            val += (ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTR);
                                        }
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 50: // 모든 스킬 레벨 증가
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incAllskill;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incAllskill;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incAllskill;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incAllskill;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incAllskill;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incAllskill;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 51: // 공격시 HP 회복
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).HP;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).HP;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).HP;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).HP;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).HP;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).HP;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 52: { // 공격시 MP 회복
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).MP;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).MP;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).MP;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).MP;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).MP;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).MP;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 53: // 캐릭터 10레벨 당 STR 증가
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRlv;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRlv;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRlv;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRlv;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRlv;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incSTRlv;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 54: // 캐릭터 10레벨 당 DEX 증가
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEXlv;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEXlv;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEXlv;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEXlv;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEXlv;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incDEXlv;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 55: // 캐릭터 10레벨 당 INT 증가
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINTlv;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINTlv;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINTlv;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINTlv;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINTlv;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incINTlv;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 56: // 캐릭터 10레벨 당 LUK 증가
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUKlv;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUKlv;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUKlv;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUKlv;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUKlv;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incLUKlv;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 57: // HP 회복 아이템 및 스킬 효율 증가
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).RecoveryUP;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).RecoveryUP;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).RecoveryUP;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).RecoveryUP;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).RecoveryUP;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).RecoveryUP;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 58: // 경험치 획득량 증가
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incEXPr;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incEXPr;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incEXPr;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incEXPr;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incEXPr;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incEXPr;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 59: // 메소 획득량 증가
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMesoProp;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMesoProp;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMesoProp;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMesoProp;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMesoProp;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMesoProp;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 60: // 캐릭터 10레벨 당 공격력 증가
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPADlv;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPADlv;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPADlv;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPADlv;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPADlv;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incPADlv;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
                case 61: // 캐릭터 10레벨 당 마력 증가
                {
                    allItem.stream()
                            .forEach(item -> {
                                if (item.getItem().getType() == 1) {
                                    Equip e = (Equip) item.getItem();
                                    int val = 0;
                                    if (e.getPotential1() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential1()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMADlv;
                                    }
                                    if (e.getPotential2() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential2()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMADlv;
                                    }
                                    if (e.getPotential3() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential3()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMADlv;
                                    }
                                    if (e.getPotential4() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential4()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMADlv;
                                    }
                                    if (e.getPotential5() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential5()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMADlv;
                                    }
                                    if (e.getPotential6() > 0) {
                                        val += ii.getPotentialInfo(e.getPotential6()).get(Math.max(0, (ii.getReqLevel(item.getItem().getItemId()) / 10) - 1)).incMADlv;
                                    }
                                    if (val >= value) {
                                        filter.add(item);
                                    }
                                }
                            });
                    break;
                }
            }
        }
    }

    public static class WorldAuction {

        static List<AuctionItemPackage> items = new ArrayList<>();
        static Map<Integer, List<AuctionInfo>> auctions = new HashMap<>();

        public static void addAuction(final int cid, final long bid, final int iid, final byte status) {
            if (auctions.get(iid) == null) {
                auctions.put(iid, new ArrayList<AuctionInfo>());
            }
            boolean isBest = true, isExist = false;
            for (AuctionInfo ai : auctions.get(iid)) {
                if (ai.getCharacterId() == cid) {
                    isExist = true;
                    auctions.get(iid).set(auctions.get(iid).indexOf(ai), new AuctionInfo(bid, cid, status));
                }
                if (bid < ai.getBid()) {
                    isBest = false;
                }
            }
            if (!isExist) {
                auctions.get(iid).add(new AuctionInfo(bid, cid, status));
            }
            if (isBest) {
            }
        }

        public static long getBidById(final int cid, final int iid) {
            long bid = 0;
            if (auctions.size() > 0) {
                for (AuctionInfo ai : auctions.get(iid)) {
                    if (ai.getCharacterId() == cid && ai.getBid() >= bid) {
                        bid = ai.getBid();
                    }
                }
            }
            return bid;
        }

        public static List<AuctionItemPackage> getItems(MapleCharacter player) {
            List<AuctionItemPackage> items_ = new ArrayList<>();
            for (AuctionItemPackage aitem : items) {
                if ((aitem.expiredTime > System.currentTimeMillis() && aitem.type == 0 && aitem.getOwnerId() != player.getId() && (aitem.getBuyer() == 999999 || aitem.getBuyer() == 0))) {
                    items_.add(aitem);
                }
            }
            return items_;
        }

        public static List<AuctionItemPackage> getAllItems() {
            List<AuctionItemPackage> items_ = new ArrayList<>();
            for (AuctionItemPackage aitem : items) {
                if ((aitem.expiredTime > System.currentTimeMillis() && (aitem.getBuyer() == 999999 || aitem.getBuyer() == 0))) {
                    items_.add(aitem);
                }
            }
            return items_;
        }

        public static List<AuctionItemPackage> getCompleteItems(final int charid) {
            List<AuctionItemPackage> items_ = new ArrayList<>();
            for (AuctionItemPackage aitem : items) {
                if (aitem.type != 0 && (aitem.getOwnerId() == charid || aitem.getBuyer() == charid || getBidById(charid, (int) aitem.getItem().getInventoryId()) > 0)) {
                    items_.add(aitem);
                }
            }
            return items_;
        }

        public static List<AuctionItemPackage> getSellAllItems(final int charid) {
            List<AuctionItemPackage> items_ = new ArrayList<>();
            for (AuctionItemPackage aitem : items) {
                if (aitem.getBuyer() == 0 && aitem.getType(false, true) == 0) {
                    items_.add(aitem);
                }
            }
            return items_;
        }

        public static int getSellAllItemsCount(final int charid) {
            int count = 0;
            for (AuctionItemPackage aitem : items) {
                if (aitem.getBuyer() == 0 && (aitem.type == 4 || aitem.type == 0) && aitem.ownerid == charid) {
                    count++;
                }
            }
            return count;
        }

        public static int getBuyAllItemsCount(final int charid) {
            int count = 0;
            for (AuctionItemPackage aitem : items) {
                if (aitem.getBuyer() == 0 && (aitem.type == 2) && aitem.ownerid == charid) {
                    count++;
                }
            }
            return count;
        }

        public static List<AuctionItemPackage> getSellItems(final int charid) {
            List<AuctionItemPackage> items_ = new ArrayList<>();
            for (AuctionItemPackage aitem : items) {
                if (aitem.getBuyer() == 0 && aitem.getType(false, true) == 0 && aitem.getOwnerId() == charid) {
                    items_.add(aitem);
                }
            }
            return items_;
        }

        public static final boolean isPremiumUser(MapleCharacter player) {
            String grade = player.getOneInfoQuest(18202, "grade");
            if (grade != null && !grade.isEmpty() && Integer.parseInt(grade) > 5) {
                String date = player.getOneInfoQuest(18202, "end");
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss");
                try {
                    Date d = sdf.parse(date);
                    if (d.getTime() > System.currentTimeMillis()) {
                        return true;
                    }
                } catch (ParseException e) {
                    System.out.println(e);
                }
            }
            return false;
        }

        public static final void addItem(final AuctionItemPackage aitem) {
            aitem.getItem().setInventoryId(items.size() + 1);
            items.add(aitem);
        }

        public static final AuctionItemPackage findByIid(final int id) {
            for (AuctionItemPackage item : items) {
                if (item.getItem().getInventoryId() == id) {
                    return item;
                }
            }
            return null;
        }

        public static final void load() {
            try {
                int i = 0;
                //System.out.println("[알림] 메이플옥션 데이터를 불러옵니다.");
                ItemFactory.loadItems(null, ItemFactory.InventoryType.AUCTION, null, null, null);
                Connection con = MYSQL.getConnection();
                try (PreparedStatement ps = con.prepareStatement("SELECT * FROM `auctions`")) {
                    try (ResultSet rs = ps.executeQuery()) {
                        while (rs.next()) {
                            i++;
                            addAuction(rs.getInt("characterid"), rs.getLong("bid"), rs.getInt("inventoryid"), rs.getByte("status"));
                        }
                    }
                    //System.out.println("[알림] 총 " + i + "개의 메이플옥션 데이터를 로딩 하였습니다.");
                }
                con.close();
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }

        public static final void save() {
            try {
                final Connection con = MYSQL.getConnection();
                PreparedStatement ps = con.prepareStatement("DELETE FROM auctions");
                ps.executeUpdate();
                ps.close();
                ps = con.prepareStatement("DELETE FROM auctionitems");
                ps.executeUpdate();
                ps.close();
                ps = con.prepareStatement("DELETE FROM auctionequipment");
                ps.executeUpdate();
                ps.close();
                ItemFactory.saveItemsFromAuction(items);
                ps = con.prepareStatement("INSERT INTO auctions (`characterid`, `bid`, `inventoryid`, `status`) VALUES (?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
                for (Map.Entry<Integer, List<AuctionInfo>> au : auctions.entrySet()) {
                    for (AuctionInfo ai : au.getValue()) {
                        ps.setInt(1, ai.getCharacterId());
                        ps.setLong(2, ai.getBid());
                        ps.setInt(3, au.getKey());
                        ps.setInt(4, ai.getStatus());
                        ps.executeUpdate();
                    }
                }
                ps.close();
                con.close();
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }

    public static class AuctionInfo {

        private int cid;
        private long bid;
        private byte status;

        public AuctionInfo(final long bid, final int cid, final byte status) {
            this.bid = bid;
            this.cid = cid;
            this.status = status;
        }

        public void setBid(final long bid) {
            this.bid = bid;
        }

        public long getBid() {
            return bid;
        }

        public int getCharacterId() {
            return cid;
        }

        public void setStatus(final byte status) {
            this.status = status;
        }

        public byte getStatus() {
            return status;
        }
    }

    public static class AuctionItemPackage {

        private long expiredTime, buyTime, startTime;
        private long bid = 0, mesos = 0;
        private Item item;
        private boolean bargain;
        private int ownerid, buyer, type;
        private String ownername;

        public AuctionItemPackage(final int ownerid, final String ownername, final Item item, final long bid, final long mesos, final long expiredTime, final boolean bargain, final int buyer, final long buyTime, final long startTime, final int type) {
            this.ownerid = ownerid;
            this.ownername = ownername;
            this.item = item;
            this.bid = bid;
            this.mesos = mesos;
            this.expiredTime = expiredTime;
            this.bargain = bargain;
            this.buyer = buyer;
            this.buyTime = buyTime;
            this.startTime = startTime;
            this.type = type;
        }

        public int getOwnerId() {
            return ownerid;
        }

        public String getOwnerName() {
            return ownername;
        }

        public void setExpiredTime(long expiredTime) {
            this.expiredTime = expiredTime;
        }

        public long getExpiredTime() {
            return expiredTime;
        }

        public void setBuyTime(long buyTime) {
            this.buyTime = buyTime;
        }

        public long getBuyTime() {
            return buyTime;
        }

        public void setStartTime(long startTime) {
            this.startTime = startTime;
        }

        public long getStartTime() {
            return startTime;
        }

        public long getBid() {
            return bid;
        }

        public void setBid(long set) {
            bid = set;
        }

        public long getMesos() {
            return mesos;
        }

        public void setMesos(long set) {
            mesos = set;
        }

        public Item getItem() {
            return item;
        }

        public boolean isBargain() {
            return bargain;
        }

        public int getBuyer() {
            return buyer;
        }

        public void setBuyer(int buyer) {
            this.buyer = buyer;
        }

        public int getType(boolean isOwner, boolean isReal) {
            if (isReal) {
                return type;
            }

            if (type == 17) {
                return isOwner ? 3 : 7;
            }

            if (type == 27) {
                return isOwner ? 8 : 7;
            }

            if (type == 18) {
                return isOwner ? 8 : 2;
            }

            if (type == 28) {
                return isOwner ? 8 : 7;
            }

            if (type == 2) {
                return isOwner ? 3 : 2;
            }

            if (type == 0) {
                return isOwner ? 4 : 0;
            }

            return type;
        }

        public void setType(int type) {
            this.type = type;
        }
    }

    public static class AuctionPacket {

        public static byte[] AuctionMessage(byte message, byte sub) {
            WritingPacket mplew = new WritingPacket();
            /*
             0 : 접속시 뜨는 메세지
               - 0 : 정상적으로 이용 가능합니다. 1 : 점검중
             1 : 등록
               - 0 : 성공 1 : 가격 설정 오류 2 : 아이템 만료 3 : 등록 보증금 부족 4 : 판매 가능 슬롯 부족 5 : 시작 입찰가 > 즉시 구매가
             2 : 취소
             3 : 즉시 구매
               - 0 : 성공 3 : 자신이 등록한건 X 4: 메소 부족 5 : 슬롯 부족
             4 : 입찰
               - 0 : 성공  1 : 최고가 실패 2 : 누군가 이미 상회 입찰 3 : 즉시 구매 가격으로 입찰 4 : 자신템의 입찰 불가 5 : 이미 최고 6 : 메소 부족 7 : 미수령 입찰금 8 ; 입찰 금액이 너무 적음(현재 입찰금의 5%이상) 9 : 슬롯 부족
             5 : 구매
               - 0 : 성공  5 : 돈 부족
             6 : 반환
               - 0 : 성공 3 : 인벤 부족
             */
            mplew.writeShort(SendPacketOpcode.AUCTION.getValue());
            mplew.write(message);
            mplew.write(sub);
            return mplew.getPacket();
        }

        public static byte[] showItemList(List<AuctionItemPackage> items, final boolean isSearch) {
            WritingPacket mplew = new WritingPacket();
            mplew.writeShort(SendPacketOpcode.AUCTION.getValue());
            mplew.write(7);
            mplew.write(0);
            mplew.write(1);
            mplew.write(1);
            mplew.writeInt(items.size()); //갯수
            for (AuctionItemPackage aitem : items) {

                mplew.writeInt(0);
                mplew.writeInt(1);

                mplew.writeInt(aitem.getItem().getInventoryId()); // auctionId
                addAuctionItemInfo(mplew, aitem, 0, "");
            }
            return mplew.getPacket();
        }

        public static byte[] updateAuctionHistory(List<AuctionItemPackage> items, final String buyername, final int ownerId) {
            WritingPacket mplew = new WritingPacket();
            mplew.writeShort(SendPacketOpcode.AUCTION.getValue());
            mplew.write(9);
            mplew.writeInt(items.size()); //갯수
            for (AuctionItemPackage aitem : items) {
                boolean Refund = false;
                Item item = aitem.getItem();
                int status = aitem.getType(ownerId == aitem.getOwnerId(), false);

                mplew.writeInt((int) item.getInventoryId());
                mplew.writeInt(1); // account id
                mplew.writeInt(aitem.getBuyer());
                mplew.writeInt(item.getItemId());
                mplew.writeInt(status); // 1 = 상회입찰 2 = 낙찰 3 = 판매 완료
                mplew.writeLong(status == 0 ? WorldAuction.getBidById(ownerId, (int) item.getInventoryId()) : aitem.getMesos()); //자신 입찰가
                mplew.writeLong(PacketProvider.getTime(aitem.getBuyTime() + (12 * 60 * 60 * 1000)));
                mplew.writeLong(aitem.getBid());
                mplew.writeInt(1); // 갯수
                mplew.writeInt(0);

                mplew.write(Refund ? 0 : 1);
                if (!Refund) {
                    mplew.writeInt(aitem.getItem().getInventoryId()); // auctionId
                    addAuctionItemInfo(mplew, aitem, ownerId, buyername);
                }
            }
            return mplew.getPacket();
        }

        public static byte[] AuctionSell(List<AuctionItemPackage> aitems) {
            WritingPacket mplew = new WritingPacket();
            mplew.writeShort(SendPacketOpcode.AUCTION.getValue());
            mplew.write(8);
            mplew.writeInt(aitems.size()); //갯수
            for (AuctionItemPackage aitem : aitems) {
                mplew.writeInt(aitem.getItem().getInventoryId()); // auctionId
                addAuctionItemInfo(mplew, aitem, 0, "");
            }

            return mplew.getPacket();
        }

        public static byte[] AuctionBuy(AuctionItemPackage aitem, final long price, final int status) {
            WritingPacket mplew = new WritingPacket();
            mplew.writeShort(SendPacketOpcode.AUCTION_BUY.getValue());
            /*
             Type
             0 = 흥정
             1 = 상회 입찰
             2 = 낙찰
             3 = 판매 완료
             4 = 판매되지 않았습니다.
             7 = 반환
             8 = 수령
             */
            mplew.write(1); //아마 뭐 구분자일듯
            mplew.writeInt((int) aitem.getItem().getInventoryId());
            mplew.writeInt(0); // accountId
            mplew.writeInt(aitem.getBuyer());
            mplew.writeInt(aitem.getItem().getItemId());
            mplew.writeInt(status);
            mplew.writeLong(price);
            mplew.writeLong(PacketProvider.getTime(aitem.getBuyTime() + (12 * 60 * 60 * 1000)));
            mplew.writeLong(0);
            mplew.writeInt(1); // count
            mplew.writeInt(7);

            return mplew.getPacket();
        }

        public static byte[] AuctionBargaining(AuctionItemPackage aitem, long bargainmeso, final String bargainstring) {
            WritingPacket mplew = new WritingPacket();
            mplew.writeShort(SendPacketOpcode.AUCTION_BUY.getValue());
            mplew.write(0);
            mplew.writeInt(aitem.isBargain() ? 1 : 0);
            mplew.writeInt(aitem.getItem().getInventoryId()); // auctionID
            mplew.writeInt(0); // buyerAccountID
            mplew.writeInt(0); // buyerCharacterID
            mplew.writeLong(0); // buyerObjectID
            mplew.writeMapleAsciiString(aitem.getOwnerName());
            mplew.writeLong(bargainmeso);
            mplew.writeMapleAsciiString(bargainstring);
            mplew.writeInt(0); // sellerAID
            mplew.writeInt(0); // sellerCID
            mplew.writeInt(0); // worldID
            mplew.writeInt(0); // errorCode

            mplew.write(1);
            PacketProvider.addItemInfo(mplew, aitem.getItem(), true, true, null);

            return mplew.getPacket();
        }

        public static void addAuctionItemInfo(WritingPacket mplew, AuctionItemPackage aitem, final int ownerId, final String buyername) {
            Item item = aitem.getItem();
            int status = aitem.getType(ownerId == aitem.getOwnerId(), false);
            mplew.writeInt(item.getInventoryId()); // auctionId
            mplew.writeInt(aitem.isBargain() ? 1 : 0);
            mplew.writeInt(1); // accountId
            mplew.writeInt(aitem.getOwnerId());
            mplew.writeInt(status == 0 ? 1 : 3); //입찰은 1? 원래는 3
            mplew.writeInt(item.getItemId() / 1000000); // itemType
            mplew.writeInt(0);
            mplew.writeAsciiString(aitem.getOwnerName(), 13);
            mplew.writeLong(aitem.getBid()); //현재 입찰가
            mplew.writeLong(aitem.getBid());
            mplew.writeLong(aitem.getMesos());
            mplew.writeLong(PacketProvider.getTime(aitem.getExpiredTime()));
            mplew.writeInt(aitem.getBuyer()); // 입찰자 userid
            mplew.writeAsciiString(buyername, 13);
            mplew.writeInt(0);
            mplew.writeLong(0); // 넥슨 OID
            mplew.writeLong(PacketProvider.getTime(aitem.getStartTime()));
            mplew.writeLong(0); // deposit
            mplew.writeInt(0);

            PacketProvider.addItemInfo(mplew, item, true, true, null);
        }
    }
}
