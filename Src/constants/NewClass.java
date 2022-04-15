/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package constants;

import client.MapleCharacter;
import client.MapleClient;
import client.items.MapleWeaponType;
import client.stats.BuffStats;
import client.stats.MonsterStatus;
import client.stats.MonsterStatusEffect;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static packet.creators.MobPacket.writeMonsterIntMask;
import packet.creators.PacketProvider;
import packet.transfer.write.WritingPacket;
import server.life.MapleLifeProvider;
import server.life.MapleMonster;
import server.life.MobSkillFactory;
import tools.Triple;

/**
 *
 * @author SEUNGHYEON
 */
public class NewClass {

    public static void main(String args[]) {
        System.out.println((9304000 - 9303999) * 10);
    }
    
    public static long get() {
        return 11L;
    }
    
    public static long get_() {
        return 15000001875000L;
    }
}
