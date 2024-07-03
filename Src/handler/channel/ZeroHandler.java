package handler.channel;

import client.MapleClient;
import client.MapleCharacter;
import client.items.Equip;
import client.items.IEquip;
import client.items.IItem;
import client.items.MapleInventory;
import client.items.MapleInventoryType;
import client.stats.ClothesStats;
import constants.GameConstants;

import java.awt.Point;

import packet.creators.MainPacketCreator;
import packet.skills.ZeroSkill;
import packet.transfer.read.ReadingMaple;
import server.items.InventoryManipulator;
import server.items.ItemInformation;
import tools.RandomStream.Randomizer;

import static handler.channel.InventoryHandler.potential;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class ZeroHandler {

    private static int type;
    private static int position;

    public static void ZeroWeaponInfo(final ReadingMaple rh, final MapleClient c) {
        MapleCharacter player = c.getPlayer();
        IEquip alpha;
        alpha = (IEquip) c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((short) -10);
        Equip ep = (Equip) alpha;
        int action = 1, level = 0, type = 0;
        switch (ep.getItemId()) {
            case 1562000:
                type = 1;
                level = 100;
                break;
            case 1562001:
                type = 2;
                level = 110;
                break;
            case 1562002:
                type = 2;
                level = 120;
                break;
            case 1562003:
                type = 2;
                level = 130;
                break;
            case 1562004:
                type = 4;
                level = 140;
                break;
            case 1562005:
                type = 5;
                level = 150;
                break;
            case 15602006:
                type = 6;
                level = 160;
                break;
            case 1562007:
                type = 7;
                level = 170;
                break;
            case 1562008:
                type = 8;
                level = 180;
                break;
            case 1562009:
                action = 0;
                type = 9;
                level = 200; // 치우씨 :: 제로 태도 구현
                break;
        }
        if (player.getLevel() < level) {
            action = 0;
        }
        c.send(ZeroSkill.WeaponInfo(type, level, action, ep.getItemId()));
    }

    public static void ZeroWeaponLevelUp(final ReadingMaple rh, final MapleClient c) {
        rh.skip(7);
        IEquip beta;
        beta = (IEquip) c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((short) -10);
        IEquip alpha;
        int betatype = 11;
        int alphatype = 12;
        alpha = (IEquip) c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((short) -11);
        Equip nalphatype = (Equip) alpha;
        Equip nbetatype = (Equip) beta;
        nbetatype.setItemId(nbetatype.getItemId() + 1);
        nalphatype.setItemId(nalphatype.getItemId() + 1);
        if (nbetatype.getItemId() == 1562001) {
            nalphatype.setWatk((short) 100);

            nbetatype.setWatk((short) 102);
            nbetatype.setWdef((short) 80);
            nbetatype.setMdef((short) 35);
            nbetatype.addUpgradeSlots((byte) 7);
        } else if (nbetatype.getItemId() == 1562002) {
            nalphatype.addWatk((short) 3); // 103

            nbetatype.addWatk((short) 3); // 105
            nbetatype.addWdef((short) 10); // 90
            nbetatype.addMdef((short) 5); // 40
        } else if (nbetatype.getItemId() == 1562003) {
            nalphatype.addWatk((short) 2); // 105

            nbetatype.addWatk((short) 2); // 107
            nbetatype.addWdef((short) 10); // 100
            nbetatype.addMdef((short) 5); // 45
        } else if (nbetatype.getItemId() == 1562004) {
            nalphatype.addWatk((short) 7); // 112

            nbetatype.addWatk((short) 7); // 114
            nbetatype.addWdef((short) 10); // 110
            nbetatype.addMdef((short) 5); // 50
        } else if (nbetatype.getItemId() == 1562005) {
            nalphatype.addStr((short) 8);
            nalphatype.addDex((short) 4);
            nalphatype.addWatk((short) 5); // 117
            nalphatype.addAcc((short) 50); // 50
            nalphatype.addUpgradeSlots((byte) 1);

            nbetatype.addStr((short) 8);
            nbetatype.addDex((short) 4);
            nbetatype.addWatk((short) 7); // 121
            nbetatype.addWdef((short) 10); // 120
            nbetatype.addMdef((short) 5); // 55
            nbetatype.addAcc((short) 50); // 50
            nbetatype.addUpgradeSlots((byte) 1);
        } else if (nbetatype.getItemId() == 1562006) {
            nalphatype.addStr((short) 27); // 35
            nalphatype.addDex((short) 16); // 20
            nalphatype.addWatk((short) 18); // 135
            nalphatype.addAcc((short) 50); // 100

            nbetatype.addStr((short) 27); // 35
            nbetatype.addDex((short) 16);  // 20
            nbetatype.addWatk((short) 18); // 139
            nbetatype.addWdef((short) 10); // 130
            nbetatype.addMdef((short) 5); // 60
            nbetatype.addAcc((short) 50); // 100
        } else if (nbetatype.getItemId() == 1562007) {
            nalphatype.addStr((short) 5); // 40
            nalphatype.addDex((short) 20); // 40
            nalphatype.addWatk((short) 34); // 169
            nalphatype.addAcc((short) 20); // 120
            nalphatype.addBossDamage((byte) 30); // 30
            nalphatype.addIgnoreWdef((short) 10); // 10

            nbetatype.addStr((short) 5); // 40
            nbetatype.addDex((short) 20);  // 40
            nbetatype.addWatk((short) 34); // 174
            nbetatype.addWdef((short) 20); // 150
            nbetatype.addMdef((short) 10); // 70
            nbetatype.addAcc((short) 20); // 120
            nbetatype.addBossDamage((byte) 30); // 30
            nbetatype.addIgnoreWdef((short) 10); // 10
        } else if (nbetatype.getItemId() == 1562008) { // 치우싸 :: 제로 태도 구현 / 본섭화 해야함
            nalphatype.addStr((short) 5); // 40
            nalphatype.addDex((short) 20); // 40
            nalphatype.addWatk((short) 34); // 169
            nalphatype.addAcc((short) 20); // 120
            nalphatype.addBossDamage((byte) 30); // 30
            nalphatype.addIgnoreWdef((short) 10); // 10

            nbetatype.addStr((short) 5); // 40
            nbetatype.addDex((short) 20);  // 40
            nbetatype.addWatk((short) 34); // 174
            nbetatype.addWdef((short) 20); // 150
            nbetatype.addMdef((short) 10); // 70
            nbetatype.addAcc((short) 20); // 120
            nbetatype.addBossDamage((byte) 30); // 30
            nbetatype.addIgnoreWdef((short) 10); // 10
        } else if (nbetatype.getItemId() == 1562009) {
            nalphatype.addStr((short) 5); // 40
            nalphatype.addDex((short) 20); // 40
            nalphatype.addWatk((short) 34); // 169
            nalphatype.addAcc((short) 20); // 120
            nalphatype.addBossDamage((byte) 30); // 30
            nalphatype.addIgnoreWdef((short) 10); // 10

            nbetatype.addStr((short) 5); // 40
            nbetatype.addDex((short) 20);  // 40
            nbetatype.addWatk((short) 34); // 174
            nbetatype.addWdef((short) 20); // 150
            nbetatype.addMdef((short) 10); // 70
            nbetatype.addAcc((short) 20); // 120
            nbetatype.addBossDamage((byte) 30); // 30
            nbetatype.addIgnoreWdef((short) 10); // 10
        }
        c.send(ZeroSkill.WeaponLevelUp());
        c.send(MainPacketCreator.updateSpecialItemUseT(alpha, (byte) 1, c.getPlayer(),
                 alphatype));
        c.send(MainPacketCreator.updateSpecialItemUseT(beta, (byte) 1, c.getPlayer(),
                 betatype));
    }

    public static void ZeroScroll(final ReadingMaple rh, final MapleClient c) {
        int s_type = rh.readInt();
        type = s_type;
        int pos = rh.readInt();
        position = pos;
        rh.skip(8);
        int s_pos = rh.readInt();
        c.send(ZeroSkill.Scroll(s_pos));
    }

    public static void ZeroScrollStart(ReadingMaple rh, MapleCharacter chr, MapleClient c) {
        c.send(ZeroSkill.ScrollStart());

        IEquip equip1 = (IEquip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -10);
        IEquip equip2 = (IEquip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -11);
        Equip nEquip = (Equip) equip1;
        Equip nEquip2 = (Equip) equip2;
        if ((type == 2)
                && (equip1.getItemId() != 1560000)
                && (equip2.getItemId() % 1572000 >= 0) && (equip2.getItemId() % 1572000 <= 9)) { // 치우씨 :: 제로 태도 구현
            InventoryHandler.UseUpgradeScroll((byte) position, (byte) nEquip2.getPosition(), c, chr);
        }
    }

    public static void ZeroChat(final ReadingMaple rh, final MapleClient c, final String txt) {
        c.send(ZeroSkill.NPCTalk(txt));
    }

    public static void ZeroEnhanceE(ReadingMaple rh, MapleCharacter chr, MapleClient c) {
        int action = rh.readInt();
        int spirit = rh.readByte();

        if (action == 0 && spirit == 0 || action == 1 && spirit == 0) {

        } else {
            c.send(ZeroSkill.ZeroWeaponE(action, spirit));
        }
    }

    public static void ZeroEnhanceM(ReadingMaple rh, MapleCharacter chr, MapleClient c) {
        int action = rh.readInt();
        int a = 0;
        int q, w, e, r, t, y, u, i, o;
        if (action == 0) {
            if (c.getPlayer().getWP() < 500) {
                c.send(MainPacketCreator.getGMText(11, "wp 가 부족합니다"));
            }
            c.send(ZeroSkill.WeaponUpgradeSuccess());
            c.send(MainPacketCreator.getGMText(11, "추가옵션이 부여되었습니다."));
            c.getPlayer().loseWP(500);
            c.getPlayer().gainMeso(-50000, false);
            c.send(MainPacketCreator.ZeroWP(c.getPlayer().getWP()));
            c.send(ZeroSkill.onZeroWP(chr));
            IEquip equip1;
            IEquip equip2;
            equip1 = (IEquip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -10);
            equip2 = (IEquip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -11);
            Equip nEquip = (Equip) equip1;
            Equip nEquip2 = (Equip) equip2;
            for (o = 0; o < 2; o++) {
                a = Randomizer.nextInt(8);
                int b = Randomizer.nextInt(1) + 1;
                switch (a) {
                    case 0:
                        nEquip.setStr((short) (equip1.getStr() + b));
                        nEquip2.setStr((short) (equip2.getStr() + b));
                        break;
                    case 1:
                        nEquip.setDex((short) (equip1.getDex() + b));
                        nEquip2.setDex((short) (equip2.getDex() + b));
                        break;
                    case 2:
                        nEquip.setInt((short) (equip1.getInt() + b));
                        nEquip2.setInt((short) (equip2.getInt() + b));
                        break;
                    case 3:
                        nEquip.setLuk((short) (equip1.getLuk() + b));
                        nEquip2.setLuk((short) (equip2.getLuk() + b));
                        break;
                    case 4:
                        nEquip.setWatk((short) (equip1.getWatk() + b));
                        nEquip2.setWatk((short) (equip2.getWatk() + b));
                        break;
                    case 5:
                        nEquip.setMatk((short) (equip1.getMatk() + b));
                        nEquip2.setMatk((short) (equip2.getMatk() + b));
                        break;
                    case 6:
                        nEquip.setMdef((short) (equip1.getMdef() + 10));
                        nEquip2.setMdef((short) (equip2.getMdef() + 10));
                        break;
                    case 7:
                        nEquip.setWdef((short) (equip1.getWdef() + 10));
                        nEquip2.setWdef((short) (equip2.getWdef() + 10));
                        break;
                    case 8:
                        nEquip.setHp((short) (equip1.getHp() + 100));
                        nEquip2.setHp((short) (equip2.getHp() + 100));
                        break;
                    case 9:
                        nEquip.setMp((short) (equip1.getMp() + 100));
                        nEquip2.setMp((short) (equip2.getMp() + 100));
                        break;
                }
            }//2번 반복
            c.send(MainPacketCreator.updateEquipSlot(equip1));
            c.send(MainPacketCreator.updateEquipSlot(equip2));
        } else if (action == 1) {
            IEquip equip1;
            IEquip equip2;
            equip1 = (IEquip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -10);
            equip2 = (IEquip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -11);
            Equip nEquip = (Equip) equip1;
            Equip nEquip2 = (Equip) equip2;
            c.getPlayer().loseWP(600);
            c.getPlayer().gainMeso(-100000, false);
            int level = nEquip.getState() - 16;
            int temp = level;
            int b = 0;
            while (temp > 1) {
                if (temp > 1) {
                    temp--;
                    b++;
                }
            }
            int epic = 5;
            int unique = 3;
            if (nEquip.getState() == 17 && Randomizer.nextInt(100) <= epic) {
                nEquip.setState((byte) 18);
                nEquip2.setState((byte) 18);
            } else if (nEquip.getState() == 18 && Randomizer.nextInt(100) <= unique) {
                nEquip.setState((byte) 19);
                nEquip2.setState((byte) 19);
            }
            nEquip.setPotential1(potential(level, b, true, nEquip.getItemId()));
            nEquip.setPotential2(potential(level, b, false, nEquip.getItemId()));
            nEquip.setPotential3(potential(level, b, false, nEquip.getItemId()));
            nEquip2.setPotential1(nEquip.getPotential1());
            nEquip2.setPotential2(nEquip.getPotential2());
            nEquip2.setPotential3(nEquip.getPotential3());
            c.send(MainPacketCreator.updateEquipSlot(equip1));
            c.send(MainPacketCreator.updateEquipSlot(equip2));
            c.send(ZeroSkill.WeaponUpgradeSuccess());
            c.send(MainPacketCreator.ZeroWP(c.getPlayer().getWP()));
            c.send(ZeroSkill.onZeroWP(chr));
            c.send(MainPacketCreator.getGMText(11, "잠재능력이 변경되었습니다."));
        }
    }

    public static void ZeroTag(final ReadingMaple rh, final MapleClient c) {
        MapleCharacter player = c.getPlayer();
        final int RealTimeTF = rh.readInt();
        final int ChangeTF = rh.readInt();
        final byte gender = (byte) c.getPlayer().getGender();
        final byte gender2 = (byte) c.getPlayer().getSecondGender();
        /* 해당 조건을 위에서 처리하는 이유 : SpawnPlayerMapObject의 혼동을 막기 위해서. */
        player.setGender(gender2);
        player.setSecondGender(gender);
        player.getMap().broadcastMessage(ZeroSkill.MultiTag(player));
        player.getMap().broadcastMessage(player, MainPacketCreator.updateCharLook(player), player.getPosition());

        player.getStat().recalcLocalStats(player);
        if (gender == 0 && gender2 == 1) {
            player.Message("[SYSTEM] 베타에서 알파로 태그를 진행 하였습니다.");
        } else if (gender == 1 && gender2 == 0) {
            player.Message("[SYSTEM] 알파에서 베타로 태그를 진행 하였습니다.");
        }
    }

    public static void ZeroAssist(final ReadingMaple rh, final MapleClient c) {
        int sid = rh.readInt();
        MapleCharacter player = c.getPlayer();
        player.getMap().broadcastMessage(MainPacketCreator.AssistAttackRequest(player.getId(), sid));
        player.getMap().broadcastMessage(player, MainPacketCreator.updateCharLook(player), player.getPosition());
    }

    public static void ZeroClothes(int kind, int check, MapleClient c) {
        int value = ClothesStats.getValueByOrder(kind), bc = c.getPlayer().getBetaClothes();
        if (check == 1 && (bc & value) == 0) {
            c.getPlayer().pBetaClothes(value);
        } else if (check == 0 && (bc & value) != 0) {
            c.getPlayer().mBetaClothes(value);
        } else {
            //System.out.println("제로 공통 옷 처리 오류" + check + " " + bc + " " + value);
        }
        c.send(ZeroSkill.Clothes(c.getPlayer().getBetaClothes()));
        c.send(ZeroSkill.Reaction());
    }
}
