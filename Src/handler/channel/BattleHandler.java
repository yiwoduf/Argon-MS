/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handler.channel;
  
import client.MapleCharacter;
import client.skills.SkillFactory;
import client.skills.SkillStatEffect;
import handler.channel.AttackInfo;
import java.awt.Point;
import java.util.LinkedList;
import java.util.List;
import packet.creators.MainPacketCreator;
import packet.creators.UIPacket;
import tools.RandomStream.Randomizer;
import tools.Timer;

/**
 *
 * @author Administrator
 */
public class BattleHandler {

    public static void doPVPattack(final MapleCharacter player, AttackInfo attack) {
        final SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
        if (effect != null) {
            Point Max = null;
            Point Min = null;
            boolean attack_in = false;
            final int range = effect.getRb() == null && effect.getLt() == null ? (effect.getRange() == 0 ? 500 : effect.getRange()) : 0;
            if (range == 0) {
                Max = getPoint_Max_Min(player, effect, true, attack);
                Min = getPoint_Max_Min(player, effect, false, attack);
            }
            List<Integer> damage = new LinkedList<Integer>();
            long totDamageToOnePlayer = 0;
            for (final MapleCharacter attackedPlayers : player.getMap().getCharacters()) {
                attack_in = in_PvP(range, player, attackedPlayers, Max, Min, attack);
                if (attack_in) {
                    if (attackedPlayers.isAlive() && attackedPlayers.getId() != player.getId()) {
                        int count = effect.getBulletCount() == 0 ? effect.getAttackCount() : effect.getBulletCount();
                        for (int i = 0; i < count; i++) {
                            int damages = (Randomizer.rand(player.getStat().getMinAttack(), player.getStat().getMaxAttack()) * effect.getDamage()) / 15000;
                            damage.add(damages);
                            totDamageToOnePlayer += damages;
                        }
                        addHp(attackedPlayers, totDamageToOnePlayer, attack, damage);
                        if (attackedPlayers.getStat().getHp() <= 0) {
                            KillPlayer(player, attackedPlayers);
                        }
                    }
                }
                attack_in = false;
            }
        }
    }

    private static final Point getPoint_Max_Min(MapleCharacter player, SkillStatEffect effect, boolean isMax, AttackInfo attack) {
        if (!(attack.animation >= 0)) {
            if (isMax) {
                return new Point(player.getPosition().x + effect.getRb().x, player.getPosition().y - effect.getLt().y);
            } else {
                return new Point(player.getPosition().x + effect.getLt().x, player.getPosition().y - effect.getRb().y);
            }
        } else {
            if (isMax) {
                return new Point(player.getPosition().x - effect.getLt().x, player.getPosition().y - effect.getLt().y);
            } else {
                return new Point(player.getPosition().x - effect.getRb().x, player.getPosition().y - effect.getRb().y);
            }
        }
    }

    private static final void addHp(final MapleCharacter attackedPlayers, long totDamageToOnePlayer, AttackInfo attack, List<Integer> damage) {
        attackedPlayers.addHP((int) -totDamageToOnePlayer);
        attackedPlayers.getClient().send(UIPacket.showWZEffect("Skill/" + attack.skill / 10000 + ".img/skill/" + attack.skill + "/hit/0", 1));
        attackedPlayers.getMap().broadcastMessage(MainPacketCreator.getPVPHPBar(attackedPlayers.getId(), (int) attackedPlayers.getStat().getHp(), attackedPlayers.getStat().getCurrentMaxHp()));
        attackedPlayers.getMap().broadcastMessage(attackedPlayers, UIPacket.broadcastWZEffect(attackedPlayers.getId(), "Skill/" + attack.skill / 10000 + ".img/skill/" + attack.skill + "/hit/0", 1), false);
        //attackedPlayers.getMap().broadcastMessage(MainPacketCreator.pvpCool(attackedPlayers.getId(), damage));
    }

    private static final void KillPlayer(final MapleCharacter player, final MapleCharacter attackedPlayers) {
        player.getClient().send(UIPacket.showWZEffect("Effect/PvPEff.img/GradeUp", 1));
        player.getMap().broadcastMessage(player, UIPacket.broadcastWZEffect(player.getId(), "Effect/PvPEff.img/GradeUp", 1), false);
        attackedPlayers.getClient().send(UIPacket.showWZEffect("Effect/PvPEff.img/GradeDown", 1));
        attackedPlayers.getMap().broadcastMessage(attackedPlayers, UIPacket.broadcastWZEffect(attackedPlayers.getId(), "Effect/PvPEff.img/GradeDown", 1), false);
        player.getMap().broadcastMessage(MainPacketCreator.getGMText(5, "[PVP] " + player.getName() + "님이 " + attackedPlayers.getName() + "님을 쓰러트려 50배틀 포인트를 획득 하였습니다."));
        if (attackedPlayers.getMeso() > 200000) {
            attackedPlayers.gainMeso(-200000, true);
        } else {
            Timer.CloneTimer tMan = Timer.CloneTimer.getInstance();
            Runnable r = new Runnable() {
                @Override
                public void run() {
                    player.getMap().broadcastMessage(UIPacket.detailShowInfo("상대방의 메소가 20만원 이하이므로 10초뒤 마을로 이동됩니다", false));
                    player.warp(100000001);
                    attackedPlayers.warp(100000001);
                }
            };
            tMan.schedule(r, 10000);
        }
        player.gainMeso(200000, true);
        attackedPlayers.PVP_Revive();
    }

    private static final boolean in_PvP(int range, MapleCharacter player, MapleCharacter attackedPlayers, Point Max, Point Min, AttackInfo attack) {
        if (range > 0) {
            if (!(attack.animation >= 0)) {
                if ((attackedPlayers.getPosition().x <= player.getPosition().x && attackedPlayers.getPosition().x >= player.getPosition().x - range) && (attackedPlayers.getPosition().y <= player.getPosition().y + 50 && attackedPlayers.getPosition().y >= player.getPosition().y - 50)) {
                    return true;
                }
            } else {
                if ((attackedPlayers.getPosition().x >= player.getPosition().x && attackedPlayers.getPosition().x <= player.getPosition().x + range) && (attackedPlayers.getPosition().y <= player.getPosition().y + 50 && attackedPlayers.getPosition().y >= player.getPosition().y - 50)) {
                    return true;
                }
            }
        } else if (attackedPlayers.getPosition().x >= Min.x && attackedPlayers.getPosition().y >= Min.y && attackedPlayers.getPosition().x <= Max.x && attackedPlayers.getPosition().y <= Max.y && attackedPlayers != player) {
            return true;
        }
        return false;
    }
}