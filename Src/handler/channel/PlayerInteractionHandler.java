/*






 */
package handler.channel;

import constants.GameConstants;
import client.MapleClient;
import client.MapleCharacter;
import client.items.IItem;
import client.items.ItemFlag;
import client.items.MapleInventoryType;
import community.MapleUserTrade;
import constants.ServerConstants;
import launch.world.WorldBroadcasting;
import packet.creators.MainPacketCreator;
import packet.creators.PlayerShopPacket;
import packet.transfer.read.ReadingMaple;
import server.items.InventoryManipulator;
import server.items.ItemInformation;
import server.maps.FieldLimitType;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.shops.*;
import tools.Pair;
import java.util.Arrays;
import java.util.concurrent.ScheduledFuture;
import packet.creators.MiniGamePacket;
import scripting.NPCScriptManager;
import tools.Timer.ShowTimer;

public class PlayerInteractionHandler {

    public enum InteractionAction {
        SET_ITEMS1(0),
        SET_ITEMS2(1),
        SET_ITEMS3(2),
        SET_ITEMS4(3),
        SET_MESO1(4),
        SET_MESO2(5),
        SET_MESO3(6),
        SET_MESO4(7),
        CONFIRM_TRADE(8),
        CONFIRM_TRADE2(9),
        CONFIRM_TRADE_MESO(10),
        CONFIRM_TRADE_MESO2(11),
        CREATE(16),
        VISIT(19),
        INVITE_TRADE(21),
        DENY_TRADE(22),
        CHAT(24),
        EXIT(28),
        OPEN2(26),
        OPEN3(80),
        MAINTANCE_CHECK(30),
        ADD_ITEM1(31),
        ADD_ITEM2(32),
        ADD_ITEM3(33),
        ADD_ITEM4(34),
        BUY_ITEM_HIREDMERCHANT(35),
        BUY_ITEM_STORE1(36),
        BUY_ITEM_STORE2(37),
        BUY_ITEM_STORE3(38),
        MAINTANCE_OFF(39),
        REMOVE_ITEM(47), //+10 시작
        MERCHANT_EXIT(48), //+10 v192
        MAINTANCE_ORGANISE(49), //+10 v192
        CLOSE_MERCHANT(50), //+10 v192
        MESO_BACK(52), //+10 v192
        VIEW_MERCHANT_VISITOR(55),
        VIEW_MERCHANT_BLACKLIST(56),
        MERCHANT_BLACKLIST_ADD(57),
        MERCHANT_BLACKLIST_REMOVE(58), //+10 v192 까지
        ADMIN_STORE_NAMECHANGE(59),
        START_ROCK_PAPER_SCISSORS1(-1),
        START_ROCK_PAPER_SCISSORS2(-2),
        START_ROCK_PAPER_SCISSORS3(-3),
        INVITE_ROCK_PAPER_SCISSORS(-4),
        FINISH_ROCK_PAPER_SCISSORS(-5),
        REQUEST_TIE(85),
        ANSWER_TIE(86),
        GIVE_UP(87),
        REQUEST_REDO(90),
        ANSWER_REDO(89),
        EXIT_AFTER_GAME(91),
        CANCEL_EXIT(92),
        READY(93),
        UN_READY(94),
        EXPEL(95),
        START(96),
        SKIP(98),
        MOVE_OMOK(99),
        SELECT_CARD(103);
        public int action;

        private InteractionAction(int action) {
            this.action = action;
        }

        public int getAction() {
            return action;
        }

        public static InteractionAction getByAction(int i) {
            for (InteractionAction s : InteractionAction.values()) {
                if (s.action == i) {
                    return s;
                }
            }
            return null;
        }
    }

    public static final void PlayerInteraction(final ReadingMaple rh, MapleClient c, final MapleCharacter chr) {
        final InteractionAction action = InteractionAction.getByAction(rh.readByte());
        switch (action) { // Mode
            case CREATE: {
                final byte createType = rh.readByte();
                if (createType == 3 || createType == 4) { // 가위바위보, 교환
                    MapleUserTrade.startTrade(chr, createType == 4 ? true : false, false);
                    if (createType == 3 || createType == 4 || createType == 7) { // trade
                        if (createType != 7) {
                            MapleUserTrade.startTrade(chr, createType == 4 ? true : false, false);
                        } else {
                            MapleUserTrade.startTrade(chr, false, true);
                        }
                    }
                } else if (createType == IMapleCharacterShop.HIRED_MERCHANT || createType == IMapleCharacterShop.PLAYER_SHOP) { // shop
                    if (!chr.getMap().getMapObjectsInRange(chr.getPosition(), 19500, Arrays.asList(MapleMapObjectType.SHOP, MapleMapObjectType.HIRED_MERCHANT)).isEmpty()) {
                        chr.dropMessage(1, "이곳에 상점을 세울 수 없습니다.");
                        return;
                    }
                    if (!chr.getMap().getMapObjectsInRange(chr.getPosition(), 19500, Arrays.asList(MapleMapObjectType.NPC)).isEmpty()) {
                        chr.dropMessage(1, "엔피시 근처에는 상점을 세울 수 없습니다.");
                        return;
                    }
                    if (createType != IMapleCharacterShop.HIRED_MERCHANT && !chr.isGM()) {
                        c.send(MainPacketCreator.resetActions());
                        return;
                    }
                    String desc = rh.readMapleAsciiString();
                    rh.skip(3);
                    int itemId = rh.readInt();
                    if (createType == IMapleCharacterShop.PLAYER_SHOP) {
                        chr.setPlayerShop(new MapleCharacterShop(chr, itemId, desc));
                        c.send(PlayerShopPacket.getPlayerStore(chr, true));
                    } else {
                        if (c.getChannelServer().constainsMerchant(c.getAccID())) {
                            chr.send(PlayerShopPacket.alreadyOpenedShop(c.getChannel(), c.getChannelServer().getMapMerchant(c.getAccID())));
                            chr.ea();
                            return;
                        }
                        final HiredMerchant merch = new HiredMerchant(chr, chr.getId(), c.getAccID(), chr.getPosition(), chr.getMapId(), c.getChannel(), itemId, desc);
                        chr.setPlayerShop(merch);
                        c.send(PlayerShopPacket.getHiredMerch(chr, merch, true));
                    }
                } else if (createType == 1 || createType == 2) {
                    if (!chr.getMap().getMapObjectsInRange(chr.getPosition(), 19500, Arrays.asList(MapleMapObjectType.MINI_GAME)).isEmpty()) {
                        chr.dropMessage(1, "이곳에 미니게임을 세울 수 없습니다.");
                        chr.ea();
                        return;
                    }
                    final String desc = rh.readMapleAsciiString();
                    String pass = "";
                    if (rh.readByte() > 0) {
                        pass = rh.readMapleAsciiString();
                    }
                    final int piece = rh.readByte();
                    final int itemId = createType == 1 ? (4080000 + piece) : 4080100;
                    MapleMiniGame game = new MapleMiniGame(chr, chr.getId(), chr.getAccountID(), chr.getPosition(), itemId, desc, createType, pass); //itemid
                    game.setPieceType(piece);
                    chr.setPlayerShop(game);
                    game.setOpen(true);
                    game.send(c);
                    chr.getMap().addMapObject(game);
                    game.update();
                }
                break;
            }
            case INVITE_TRADE: {
                MapleCharacter ochr = chr.getMap().getCharacterById_InMap(rh.readInt());
                MapleUserTrade.inviteTrade(chr, ochr, true);
                break;
            }

            case INVITE_ROCK_PAPER_SCISSORS: {
                chr.setKeyValue2("RPSOTHER", rh.readInt());
                NPCScriptManager.getInstance().start(c, 2100, "RPS");
                break;
            }

            case START_ROCK_PAPER_SCISSORS3:
            case START_ROCK_PAPER_SCISSORS2:
            case START_ROCK_PAPER_SCISSORS1: {
                if (chr.getTrade() != null && chr.getTrade().getPartner() != null) {
                    chr.send(MainPacketCreator.StartRPS());
                    chr.getTrade().getPartner().getChr().send(MainPacketCreator.StartRPS());
                }
                break;
            }
            case FINISH_ROCK_PAPER_SCISSORS: {
                if (chr.getTrade() != null && chr.getTrade().getPartner() != null) {
                    chr.getTrade().setRPS(rh.readByte());
                    ShowTimer.getInstance().schedule(new Runnable() {

                        @Override
                        public void run() {
                            byte result = getResult(chr.getTrade().getPRS(), chr.getTrade().getPartner().getPRS());
                            if (result == 2) {
                                chr.gainMeso(-chr.getKeyValue2("RPS"), true);
                                chr.setKeyValue2("RPS", 0);
                            } else if (result == 0) {
                                chr.gainMeso(chr.getKeyValue2("RPS"), true);
                                chr.setKeyValue2("RPS", 0);
                            }
                            chr.getClient().send(MainPacketCreator.FinishRPS(result, chr.getTrade().getPartner().getPRS()));
                        }
                    }, 1000);
                }
                break;
            }

            case DENY_TRADE: {
                MapleUserTrade.declineTrade(chr);
                break;
            }
            case VISIT: {
                int oid = rh.readInt();
                if (chr.getTrade() != null && chr.getTrade().getPartner() != null) {
                    MapleUserTrade.visitTrade(chr, chr.getTrade().getPartner().getChr(), chr.getTrade().getPartner().getChr().isTrade);
                } else {
                    final MapleMapObject ob2 = chr.getMap().getMapObject(oid);
                    if (ob2 instanceof HiredMerchant) {
                        rh.skip(2);
                        final IMapleCharacterShop ips = (IMapleCharacterShop) ob2;
                        final HiredMerchant merchant = (HiredMerchant) ips;
                        if (merchant.isOwner(chr)) {
                            merchant.setOpen(false);
                            merchant.removeAllVisitors((byte) 18, (byte) 1);
                            chr.setPlayerShop(ips);
                            c.send(PlayerShopPacket.getHiredMerch(chr, merchant, false));
                        } else if (!merchant.isOpen()) {
                            chr.dropMessage(1, "현재 고용상점이 준비중에 있습니다.");
                        } else if (ips.getFreeSlot() == -1) {
                            chr.dropMessage(1, "해당 상점을 이미 수용가능한 최대 인원이 보고 있습니다. 잠시 후 다시 시도해 주세요.");
                        } else if (merchant.isInBlackList(chr.getName())) {
//                                        chr.getClient().send(PlayerShopPacket.shopErrorMessage(0x10, 1));
                            chr.dropMessage(1, "블랙리스트에 등록되어 해당 상점을 이용하실 수 없습니다.");
                        } else {
                            chr.setPlayerShop(ips);
                            merchant.addVisitor(chr);
                            c.send(PlayerShopPacket.getHiredMerch(chr, merchant, false));
                        }
                        break;
                    } else {
                        MapleMiniGame ips = (MapleMiniGame) chr.getMap().getMapObject(oid);
                        if (ips.getFreeSlot() < 0 || ips.getVisitorSlot(chr) > -1 || !ips.isOpen()) {
                            c.getPlayer().dropMessage(1, "해당 방은 이미 인원이 가득 찼습니다.");
                        } else {
                            if (rh.available() > 0 && rh.readByte() > 0) { //a password has been entered
                                String pass = rh.readMapleAsciiString();
                                if (!pass.equals(ips.getPassword())) {
                                    c.getPlayer().dropMessage(1, "입력한 비밀번호가 올바르지 않습니다.");
                                    return;
                                }
                            } else if (ips.getPassword().length() > 0) {
                                c.getPlayer().dropMessage(1, "입력한 비밀번호가 올바르지 않습니다.");
                                return;
                            }
                            chr.setPlayerShop(ips);
                            ips.addVisitor(chr);
                            ((MapleMiniGame) ips).send(c);
                        }
                    }
                }
                break;
            }
            case CHAT: {
                rh.readInt();
                if (chr.getTrade() != null) {
                    String text = rh.readMapleAsciiString();
                    chr.getTrade().chat(text);
                } else if (chr.getPlayerShop() != null) {
                    final IMapleCharacterShop ips = chr.getPlayerShop();
                    final String message = chr.getName() + " : " + rh.readMapleAsciiString();
                    final byte slot = ips.getVisitorSlot(chr);
                    if (ips.getShopType() == IMapleCharacterShop.HIRED_MERCHANT) {
                        ips.getMessages().add(new Pair<String, Byte>(message, slot));
                    }
                }
                break;
            }
            case EXIT: {
                if (chr.getTrade() != null) {
                    MapleUserTrade.cancelTrade(chr.getTrade());
                } else {
                    final IMapleCharacterShop ips = chr.getPlayerShop();
                    if (ips == null) {
                        // ////System.out.println("IMapleCharacterShop Null Point");
                        return;
                    }
                    if (ips.getShopType() == 3 || ips.getShopType() == 4) {
                        MapleMiniGame game = (MapleMiniGame) ips;
                        if (game.isOwner(chr)) {
                            game.removeAllVisitors(3, 1);
                            game.closeShop(true, true);
                            chr.setPlayerShop(null);
                            //      chr.getMap().removeMapObject(game);
                            chr.getMap().broadcastMessage(PlayerShopPacket.sendPlayerShopBox(chr));
                        } else {
                            game.removeVisitor(chr);
                            chr.setPlayerShop(null);
                        }
                    } else if (ips.isOwner(chr)) {
                        if (ips.getShopType() == IMapleCharacterShop.PLAYER_SHOP) {
                            boolean save = false;
                            for (MapleCharacterShopItem items : ips.getItems()) {
                                if (items.bundles > 0) {
                                    if (InventoryManipulator.addFromDrop(c, items.item, false) != -1) {
                                        items.bundles = 0;
                                    } else {
                                        save = true;
                                        break;
                                    }
                                }
                            }
                            ips.removeAllVisitors(3, 1);
                            ips.closeShop(save, true);
                        } else {
                            ips.removeAllVisitors(3, 1);
                            ips.closeShop(false, false);
                        }
                    } else {
                        ips.removeVisitor(chr);
                    }
                    chr.setPlayerShop(null);
                }
                break;
            }
            case OPEN3:
            case OPEN2: {
                //if (chr.getMap().allowPersonalShop()) {
                final IMapleCharacterShop shop = chr.getPlayerShop();
                if (shop != null && shop.isOwner(chr)) {
                    chr.getMap().addMapObject((AbstractPlayerStore) shop);
                    if (shop.getShopType() == IMapleCharacterShop.HIRED_MERCHANT) {
                        final HiredMerchant merchant = (HiredMerchant) shop;
                        merchant.setStoreid(c.getChannelServer().addMerchant(merchant));
                        merchant.setOpen(true);
                        chr.getMap().broadcastMessage(PlayerShopPacket.spawnHiredMerchant(merchant));
                        chr.setPlayerShop(null);
                    } else if (shop.getShopType() == IMapleCharacterShop.PLAYER_SHOP) {
                        chr.getMap().broadcastMessage(PlayerShopPacket.sendPlayerShopBox(chr));
                    }
                }
                //} else {

                //}
                break;
            }
            case SET_ITEMS4:
            case SET_ITEMS3:
            case SET_ITEMS2:
            case SET_ITEMS1: {
                final ItemInformation ii = ItemInformation.getInstance();
                final MapleInventoryType ivType = MapleInventoryType.getByType(rh.readByte());
                final IItem item = chr.getInventory(ivType).getItem((short) rh.readShort());
                final short quantity = rh.readShort();
                final byte targetSlot = rh.readByte();

                if (chr.getTrade() != null && item != null) {
                    if ((quantity <= item.getQuantity() && quantity >= 0) || GameConstants.isThrowingStar(item.getItemId()) || GameConstants.isBullet(item.getItemId())) {
                        final short flag = item.getFlag();

                        if (ItemFlag.UNTRADEABLE.check(flag) || ItemFlag.LOCK.check(flag)) {
                            c.send(MainPacketCreator.resetActions());
                            return;
                        }
                        if (ii.isDropRestricted(item.getItemId())) {
                            if (!(ItemFlag.KARMA_EQ.check(flag) || ItemFlag.KARMA_USE.check(flag))) {
                                c.send(MainPacketCreator.resetActions());
                                return;
                            }
                        }
                        IItem tradeItem = item.copy();
                        if (GameConstants.isThrowingStar(item.getItemId()) || GameConstants.isBullet(item.getItemId())) {
                            tradeItem.setQuantity(item.getQuantity());
                            InventoryManipulator.removeFromSlot(c, ivType, item.getPosition(), item.getQuantity(), true);
                        } else {
                            tradeItem.setQuantity(quantity);
                            InventoryManipulator.removeFromSlot(c, ivType, item.getPosition(), quantity, true);
                        }
                        tradeItem.setPosition(targetSlot);
                        chr.getTrade().addItem(tradeItem);
                    }
                }
                break;
            }
            case SET_MESO4:
            case SET_MESO3:
            case SET_MESO2:
            case SET_MESO1: {
                final MapleUserTrade trade = chr.getTrade();
                if (trade != null) {
                    trade.setMeso(rh.readInt());
                }
                break;
            }
            case CONFIRM_TRADE:
            case CONFIRM_TRADE2:
            case CONFIRM_TRADE_MESO:
            case CONFIRM_TRADE_MESO2: {
                if (chr.getTrade() != null) {
                    MapleUserTrade.completeTrade(chr);
                }
                break;
            }
            case ADD_ITEM4:
            case ADD_ITEM3:
            case ADD_ITEM2:
            case ADD_ITEM1: {
                final MapleInventoryType type = MapleInventoryType.getByType(rh.readByte());
                final byte slot = (byte) rh.readShort();
                final short bundles = rh.readShort(); // How many in a bundle
                final short perBundle = rh.readShort(); // Price per bundle
                final int price = rh.readInt();
                if (price <= 0 || bundles <= 0 || perBundle <= 0) {
                    return;
                }
                final IMapleCharacterShop shop = chr.getPlayerShop();
                if (shop == null || !shop.isOwner(chr)) {
                    return;
                }
                final IItem ivItem = chr.getInventory(type).getItem(slot);
                if (ivItem != null) {
                    final short bundles_perbundle = (short) (bundles * perBundle);
                    if (bundles_perbundle < 0) { // int_16 overflow
                        return;
                    }
                    if (ivItem.getQuantity() >= bundles_perbundle) {
                        final short flag = ivItem.getFlag();
                        if (ItemFlag.UNTRADEABLE.check(flag) || ItemFlag.LOCK.check(flag)) {
                            c.send(MainPacketCreator.resetActions());
                            return;
                        }
                        if (ItemInformation.getInstance().isDropRestricted(ivItem.getItemId())) {
                            if (!(ItemFlag.KARMA_EQ.check(flag) || ItemFlag.KARMA_USE.check(flag))) {
                                c.send(MainPacketCreator.resetActions());
                                return;
                            }
                        }
                        if (GameConstants.isThrowingStar(ivItem.getItemId()) || GameConstants.isBullet(ivItem.getItemId())) {
                            // Ignore the bundles
                            InventoryManipulator.removeFromSlot(c, type, slot, ivItem.getQuantity(), true);

                            final IItem sellItem = ivItem.copy();
                            shop.addItem(new MapleCharacterShopItem(sellItem, (short) 1, price));
                        } else {
                            InventoryManipulator.removeFromSlot(c, type, slot, bundles_perbundle, true);

                            final IItem sellItem = ivItem.copy();
                            sellItem.setQuantity(perBundle);
                            shop.addItem(new MapleCharacterShopItem(sellItem, bundles, price));
                        }
                        c.send(PlayerShopPacket.shopItemUpdate(shop));
                    }
                }
                break;
            }
            case BUY_ITEM_STORE3:
            case BUY_ITEM_STORE2:
            case BUY_ITEM_STORE1:
            case BUY_ITEM_HIREDMERCHANT: { // Buy and Merchant buy
                //BE 00 16 00 2D 00 4D AB 3C 02
                final int item = rh.readByte();
                final short quantity = rh.readShort();
                final IMapleCharacterShop shop = chr.getPlayerShop();

                if (shop == null || shop.isOwner(chr)) {
                    return;
                }
                final MapleCharacterShopItem tobuy = shop.getItems().get(item);
                if (tobuy == null) {
                    c.getPlayer().message(1, "해당 아이템이 이미 존재하지 않습니다.");
                    return;
                }
                long check = tobuy.bundles * quantity;
                long check2 = tobuy.price * quantity;
                long check3 = tobuy.item.getQuantity() * quantity;
                if (/*check > 32767 || */check <= 0 || check2 > 2147483647 || check2 <= 0 || check3 > 32767 || check3 <= 0) { //This is the better way to check.
                    c.getPlayer().ea();
                    return;
                }
                if (quantity <= 0 || tobuy.bundles < quantity || (tobuy.bundles % quantity != 0 && GameConstants.isEquip(tobuy.item.getItemId())) // Buying
                        || chr.getMeso() - (check2) < 0 || shop.getMeso() + (check2) < 0) {
                    c.getPlayer().message(1, "메소가 부족합니다!");
                    c.getPlayer().ea();
                    return;
                }
                shop.buy(c, item, quantity);

                if (c.getChannelServer().getPlayerStorage().getCharacterById(shop.getOwnerId()) != null) {
                    c.getChannelServer().getPlayerStorage().getCharacterById(shop.getOwnerId()).message(5, "고용상점에 올리신 [" + ItemInformation.getInstance().getName(item) + "] 아이템 " + quantity + "개가 판매되었습니다.");
                }
                shop.broadcastToVisitors(PlayerShopPacket.shopItemUpdate(shop));
                break;
            }
            case REMOVE_ITEM: {
//                ////System.out.println("REMOVE_ITEM : "+rh);
                rh.skip(1);
                final int slot = rh.readShort();
                final IMapleCharacterShop shop = chr.getPlayerShop();

                if (shop == null || !shop.isOwner(chr)) {
                    return;
                }
                final MapleCharacterShopItem item = shop.getItems().get(slot);

                if (item != null) {
                    if (item.bundles > 0) {
                        IItem item_get = item.item.copy();
                        long check = item.bundles * item.item.getQuantity();
                        if (check <= 0 || check > 32767) {
                            return;
                        }
                        item_get.setQuantity((short) check);
                        if (InventoryManipulator.checkSpace(c, item_get.getItemId(), item_get.getQuantity(), item_get.getOwner())) {
                            InventoryManipulator.addFromDrop(c, item_get, false);
                            item.bundles = 0;
                            shop.removeFromSlot(slot);
                            shop.removeItem(item.item.getItemId());
                        }
                    }
                }
                c.send(PlayerShopPacket.shopItemUpdate(shop));
                break;
            }

            case MAINTANCE_OFF: {
                final IMapleCharacterShop shop = chr.getPlayerShop();
                if (shop != null && shop instanceof HiredMerchant && shop.isOwner(chr)) {
                    if (shop.getItems().isEmpty()) {
                        chr.message(1, "상점에 아이템이 비어있습니다. 상점에 아이템이 없다면 고용상점을 열어둘 수 없습니다.");
                        chr.ea();
                    } else {
                        shop.getMessages().clear();
                        shop.setOpen(true);
                        chr.setPlayerShop(null);
                    }
                }
                break;
            }
            case MERCHANT_EXIT: {
                final IMapleCharacterShop shop = chr.getPlayerShop();
                if (shop != null && shop instanceof HiredMerchant && shop.isOwner(chr)) {
                    shop.setOpen(true);
                    chr.setPlayerShop(null);
                }
                break;
            }
            case MAINTANCE_ORGANISE: {
                final IMapleCharacterShop imps = chr.getPlayerShop();
                if (imps != null && imps.isOwner(chr)) {
                    for (int i = 0; i < imps.getItems().size(); i++) {
                        if (imps.getItems().get(i).bundles == 0) {
                            imps.getItems().remove(i);
                        }
                    }
                    if (chr.getMeso() + imps.getMeso() < 0) {
                        c.send(PlayerShopPacket.shopItemUpdate(imps));
                    } else {
                        //chr.gainMeso(imps.getMeso(), false);
                        //imps.setMeso(0);
                        c.send(PlayerShopPacket.shopItemUpdate(imps));
                    }
                }
                break;
            }
            case MESO_BACK: {
                final IMapleCharacterShop imps = chr.getPlayerShop();
                if (imps != null && imps.isOwner(chr)) {
                    if (chr.getMeso() + imps.getMeso() < 0) {
                        c.send(PlayerShopPacket.shopItemUpdate(imps));
                    } else {
                        //chr.gainMeso(imps.getMeso(), false);
                        //imps.setMeso(0);
                        c.send(PlayerShopPacket.shopItemUpdate(imps));
                    }
                }
                break;
            }
            case CLOSE_MERCHANT: {
                final IMapleCharacterShop merchant = chr.getPlayerShop();
                if (merchant != null && merchant.getShopType() == IMapleCharacterShop.HIRED_MERCHANT && merchant.isOwner(chr)) {
                    boolean save = false;
                    if (chr.getMeso() + merchant.getMeso() < 0) { //오버플로우
                        save = false;
                    } else {
                        if (merchant.getItems().size() > 0) {
                            for (MapleCharacterShopItem items : merchant.getItems()) {
                                if (items.bundles > 0) {
                                    IItem item_get = items.item.copy();
                                    item_get.setQuantity((short) (items.bundles * items.item.getQuantity()));
                                    save = true;
                                }
                            }
                        }
                    }
                    if (save) {
                        c.getPlayer().dropMessage(1, "프레드릭 에게서 아이템을 찾아가 주십시오.");
                        c.send(PlayerShopPacket.shopErrorMessage(0x1C, 0, 0x14));
                    } else {
                        c.send(PlayerShopPacket.shopErrorMessage(0x1C, 0, 0x14));
                    }
                    merchant.closeShop(save, true);
                    chr.Message(6, save + "");
                    chr.setPlayerShop(null);
                    break;
                }
            }

            case ADMIN_STORE_NAMECHANGE: {
                break;
            }

            case VIEW_MERCHANT_VISITOR: {
                final IMapleCharacterShop merchant = chr.getPlayerShop();
                if (merchant != null && merchant.getShopType() == IMapleCharacterShop.HIRED_MERCHANT && merchant.isOwner(chr)) {
                    ((HiredMerchant) merchant).sendVisitor(c);
                }
                break;
            }

            case VIEW_MERCHANT_BLACKLIST: {
                final IMapleCharacterShop merchant = chr.getPlayerShop();
                if (merchant != null && merchant.getShopType() == IMapleCharacterShop.HIRED_MERCHANT && merchant.isOwner(chr)) {
                    ((HiredMerchant) merchant).sendBlackList(c);
                }
                break;
            }

            case MERCHANT_BLACKLIST_ADD: {
                final IMapleCharacterShop merchant = chr.getPlayerShop();
                if (merchant != null && merchant.getShopType() == IMapleCharacterShop.HIRED_MERCHANT && merchant.isOwner(chr)) {
                    ((HiredMerchant) merchant).addBlackList(rh.readMapleAsciiString());
                }
                break;
            }

            case MERCHANT_BLACKLIST_REMOVE: {
                final IMapleCharacterShop merchant = chr.getPlayerShop();
                if (merchant != null && merchant.getShopType() == IMapleCharacterShop.HIRED_MERCHANT && merchant.isOwner(chr)) {
                    ((HiredMerchant) merchant).removeBlackList(rh.readMapleAsciiString());
                }
                break;
            }
            case EXIT_AFTER_GAME:
            case CANCEL_EXIT: {
                final IMapleCharacterShop ips = chr.getPlayerShop();
                if (ips != null && ips instanceof MapleMiniGame) {
                    MapleMiniGame game = (MapleMiniGame) ips;
                    if (game.isOpen()) {
                        break;
                    }
                    game.setExitAfter(chr);
                    game.broadcastToVisitors(MiniGamePacket.getMiniGameExitAfter(game.isExitAfter(chr)));
                }
                break;
            }
            case READY: {
                final IMapleCharacterShop ips = chr.getPlayerShop();
                if (ips != null && ips instanceof MapleMiniGame) {
                    MapleMiniGame game = (MapleMiniGame) ips;
                    if (!game.isOwner(chr) && game.isOpen()) {
                        game.setReady(game.getVisitorSlot(chr));
                        game.broadcastToVisitors(MiniGamePacket.getMiniGameReady(game.isReady(game.getVisitorSlot(chr))));
                    }
                }
                break;
            }
            case UN_READY: {
                final IMapleCharacterShop ips = chr.getPlayerShop();
                if (ips != null && ips instanceof MapleMiniGame) {
                    MapleMiniGame game = (MapleMiniGame) ips;
                    if (!game.isOwner(chr) && game.isOpen()) {
                        game.setReady(game.getVisitorSlot(chr));
                        game.broadcastToVisitors(MiniGamePacket.getMiniGameReady(false));
                    }
                }
                break;
            }
            case EXPEL: {
                final IMapleCharacterShop ips = chr.getPlayerShop();
                ips.removeAllVisitors(3, 1); //no msg
                chr.dropMessage(1, "선택한 플레이어를 강제 퇴장 시켰습니다.");
                break;
            }
            case START: {
                final IMapleCharacterShop ips = chr.getPlayerShop();
                MapleMiniGame game = (MapleMiniGame) ips;
                if (game.isOwner(chr) && game.isOpen()) {
                    for (int i = 1; i < ips.getSize(); i++) {
                        if (!game.isReady(i)) {
                            return;
                        }
                    }
                    game.setGameType();
                    game.shuffleList();
                    if (game.getGameType() == 1) {
                        game.broadcastToVisitors(MiniGamePacket.getMiniGameStart(game.getLoser()));
                    } else {
                        game.broadcastToVisitors(MiniGamePacket.getMatchCardStart(game, game.getLoser()));
                    }
                    game.setOpen(false);
                    game.update();
                }
                break;
            }
            case GIVE_UP: {
                final IMapleCharacterShop ips = chr.getPlayerShop();
                if (ips != null && ips instanceof MapleMiniGame) {
                    MapleMiniGame game = (MapleMiniGame) ips;
                    if (game.isOpen()) {
                        break;
                    }
                    game.broadcastToVisitors(MiniGamePacket.getMiniGameResult(game, 0, game.getVisitorSlot(chr)));
                    game.nextLoser();
                    game.setOpen(true);
                    game.update();
                    game.checkExitAfterGame();
                }
                break;
            }
            case REQUEST_TIE: {
                final IMapleCharacterShop ips = chr.getPlayerShop();
                if (ips != null && ips instanceof MapleMiniGame) {
                    MapleMiniGame game = (MapleMiniGame) ips;
                    if (game.isOpen()) {
                        break;
                    }
                    if (game.isOwner(chr)) {
                        game.broadcastToVisitors(MiniGamePacket.getMiniGameRequestTie(), false);
                    } else {
                        game.getMCOwner().getClient().send(MiniGamePacket.getMiniGameRequestTie());
                    }
                    game.setRequestedTie(game.getVisitorSlot(chr));
                }
                break;
            }
            case ANSWER_TIE: {
                final IMapleCharacterShop ips = chr.getPlayerShop();
                if (ips != null && ips instanceof MapleMiniGame) {
                    MapleMiniGame game = (MapleMiniGame) ips;
                    if (game.isOpen()) {
                        break;
                    }
                    if (game.getRequestedTie() > -1 && game.getRequestedTie() != game.getVisitorSlot(chr)) {
                        if (rh.readByte() > 0) {
                            game.broadcastToVisitors(MiniGamePacket.getMiniGameResult(game, 1, game.getRequestedTie()));
                            game.nextLoser();
                            game.setOpen(true);
                            game.update();
                            game.checkExitAfterGame();
                        } else {
                            game.broadcastToVisitors(MiniGamePacket.getMiniGameDenyTie());
                        }
                        game.setRequestedTie(-1);
                    }
                }
                break;
            }
            case MOVE_OMOK: {
                final IMapleCharacterShop ips = chr.getPlayerShop();
                if (ips != null && ips instanceof MapleMiniGame) {
                    MapleMiniGame game = (MapleMiniGame) ips;
                    if (game.isOpen()) {
                        break;
                    }
                    game.setPiece(rh.readInt(), rh.readInt(), rh.readByte(), chr);
                }
                break;
            }
            case SKIP: {
                final IMapleCharacterShop ips = chr.getPlayerShop();
                if (ips != null && ips instanceof MapleMiniGame) {
                    MapleMiniGame game = (MapleMiniGame) ips;
                    ips.broadcastToVisitors(MiniGamePacket.getMiniGameSkip(ips.getVisitorSlot(chr)));
                    game.nextLoser();
                }
                break;
            }
            case SELECT_CARD: {
                final IMapleCharacterShop ips = chr.getPlayerShop();
                if (ips != null && ips instanceof MapleMiniGame) {
                    MapleMiniGame game = (MapleMiniGame) ips;
                    if (game.isOpen()) {
                        break;
                    }
                    if (game.getLoser() != game.getVisitorSlot(chr)) {
                        game.broadcastToVisitors(PlayerShopPacket.shopChat("Card could not be placed by " + chr.getName() + ". Loser: " + game.getLoser() + " Visitor: " + game.getVisitorSlot(chr), game.getVisitorSlot(chr)));
                        return;
                    }
                    if (rh.readByte() != game.getTurn()) {
                        game.broadcastToVisitors(PlayerShopPacket.shopChat("Omok could not be placed by " + chr.getName() + ". Loser: " + game.getLoser() + " Visitor: " + game.getVisitorSlot(chr) + " Turn: " + game.getTurn(), game.getVisitorSlot(chr)));
                        return;
                    }
                    final int slot = rh.readByte();
                    final int turn = game.getTurn();
                    final int fs = game.getFirstSlot();
                    if (turn == 1) {
                        game.setFirstSlot(slot);
                        if (game.isOwner(chr)) {
                            game.broadcastToVisitors(MiniGamePacket.getMatchCardSelect(turn, slot, fs, turn), false);
                        } else {
                            game.getMCOwner().getClient().send(MiniGamePacket.getMatchCardSelect(turn, slot, fs, turn));
                        }
                        game.setTurn(0); //2nd turn nao
                        return;
                    } else if (fs >= 0 && game.getCardId(fs + 1) == game.getCardId(slot + 1)) {
                        game.broadcastToVisitors(MiniGamePacket.getMatchCardSelect(turn, slot, fs, game.isOwner(chr) ? 2 : 3));
                        game.setPoints(game.getVisitorSlot(chr)); //correct.. so still same loser. diff turn tho
                    } else {
                        game.broadcastToVisitors(MiniGamePacket.getMatchCardSelect(turn, slot, fs, game.isOwner(chr) ? 0 : 1));
                        game.nextLoser();//wrong haha
                    }
                    game.setTurn(1);
                    game.setFirstSlot(0);

                }
                break;
            }
            case REQUEST_REDO: {
                final byte sel = rh.readByte();
                if (sel == 1) {
                    final IMapleCharacterShop ips = chr.getPlayerShop();
                    if (ips != null && ips instanceof MapleMiniGame) {
                        MapleMiniGame game = (MapleMiniGame) ips;
                        game.broadcastToVisitors(PlayerShopPacket.shopChat("무르기가 승락되었습니다.", game.getVisitorSlot(chr)));
                        game.nextLoser();
                        ips.broadcastToVisitors(MiniGamePacket.getMiniGameSkip(ips.getVisitorSlot(chr)));
                    }
                } else {
                    final IMapleCharacterShop ips = chr.getPlayerShop();
                    if (ips != null && ips instanceof MapleMiniGame) {
                        ips.broadcastToVisitors(MiniGamePacket.getMiniGameOmokTest2(sel, ips.getVisitorSlot(chr)));
                    }
                }
                break;
            }
            case ANSWER_REDO: {
                final IMapleCharacterShop ips = chr.getPlayerShop();
                if (ips != null && ips instanceof MapleMiniGame) {
                    MapleMiniGame game = (MapleMiniGame) ips;
                    if (game.isOpen()) {
                        break;
                    }
                    if (game.isOwner(chr)) {
                        game.broadcastToVisitors(MiniGamePacket.getMiniGameOmokTest(), false);
                    } else {
                        game.getMCOwner().getClient().send(MiniGamePacket.getMiniGameOmokTest());
                    }
                    // game.setRequestedTie(game.getVisitorSlot(chr));
                }
                //       c.getPlayer().dropMessage(1, "죄송합니다. 현재 해당 기능을 지원하지 않습니다.");
                break;
            }

            case MAINTANCE_CHECK: {
                boolean correct = false;
                byte type1 = rh.readByte();
                byte type2 = rh.readByte();
                if (type2 == 7 && type1 == 16) {
                    rh.readMapleAsciiString();
                    final int obid = rh.readInt();
                    //c.send(MainPacketCreator.getCashTrade(obid));
                } else {
                    if (c.isUsing2ndPassword()) {
                        String password = rh.readMapleAsciiString();
                        if (password.equals("") || password == null) {
                            return;
                        } else if (password.equals(c.getSecondPassword())) {
                            correct = true;
                        }
                    } else {
                        int idcode = rh.readInt();
                        if (idcode <= 0) {
                            return;
                        } else if (idcode == c.getIDCode2()) {
                            correct = true;
                        }
                    }
                    int oid = rh.readInt();
                    rh.skip(1);
                    c.send(PlayerShopPacket.MaintanceCheck(correct, oid));
                }
                break;
            }
            default: {
                ////System.out.println("Unhandled interaction action : " + action + ", " + rh.toString());
                break;
            }
        }
    }

    public static final byte getResult(byte rps1, byte rps2) {
        switch (rps1) {
            case 0: {
                if (rps2 == 1) {
                    return 2;
                }
                if (rps2 == 2) {
                    return 0;
                }
                break;
            }
            case 1: {
                if (rps2 == 2) {
                    return 2;
                }
                if (rps2 == 0) {
                    return 0;
                }
                break;
            }
            case 2: {
                if (rps2 == 0) {
                    return 2;
                }
                if (rps2 == 1) {
                    return 0;
                }
                break;
            }
        }
        return 1;
    }
}
