/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 *
 */
package handler.channel;

import java.util.Iterator;

import client.MapleCharacter;
import client.MapleClient;
import client.skills.ISkill;
import client.skills.Skill;
import client.skills.SkillFactory;
import client.skills.SkillStatEffect;
import client.stats.PlayerStat;
import community.*;
import launch.ChannelServer;
import launch.holder.WideObjectHolder;
import launch.world.WorldBroadcasting;
import packet.creators.MainPacketCreator;
import packet.transfer.read.ReadingMaple;
import server.maps.MapleMap;

public class GuildHandler {

	public static void DenyGuildRequest(ReadingMaple rh, MapleClient c) {
		int guildid = rh.readInt();
		Iterator<Invited> itr = invited.iterator();
		c.getPlayer().setGuildId(guildid);
		c.getPlayer().setGuildRank(5);
		itr.remove();
		int guildmax;
		guildmax = ChannelServer.addGuildMember(c.getPlayer().getMGC(), c);
		if (guildmax == 0) {
			c.getPlayer().dropMessage(1, "가입하려는 길드는 이미 정원이 꽉 찼습니다.");
			c.getPlayer().setGuildId(0);
			return;
		}
		c.getSession().writeAndFlush(MainPacketCreator.showGuildInfo(c.getPlayer()));
		c.getPlayer().saveGuildStatus();
		respawnPlayer(c.getPlayer());
	}

	private static boolean isGuildNameAcceptable(String name) {
		if (name.getBytes().length < 4 || name.getBytes().length > 12) {
			return false;
		}
		return true;
	}

	private static void respawnPlayer(MapleCharacter mc) {
		mc.getMap().broadcastMessage(mc, MainPacketCreator.removePlayerFromMap(mc.getId()), false);
		mc.getMap().broadcastMessage(mc, MainPacketCreator.spawnPlayerMapobject(mc), false);
	}

	private static class Invited {

		public String name;
		public int gid;
		public long expiration;

		public Invited(String n, int id) {
			name = n.toLowerCase();
			gid = id;
			expiration = System.currentTimeMillis() + 60 * 60 * 1000; // 1 hr expiration
		}

		@Override
		public boolean equals(Object other) {
			if (!(other instanceof Invited)) {
				return false;
			}
			Invited oth = (Invited) other;
			return (gid == oth.gid && name.equals(oth));
		}
	}
	private static java.util.List<Invited> invited = new java.util.LinkedList<Invited>();
	private static long nextPruneTime = System.currentTimeMillis() + 20 * 60 * 1000;

	public static void GuildOpertion(ReadingMaple rh, MapleClient c) {
		if (System.currentTimeMillis() >= nextPruneTime) {
			Iterator<Invited> itr = invited.iterator();
			Invited inv;
			while (itr.hasNext()) {
				inv = itr.next();
				if (System.currentTimeMillis() >= inv.expiration) {
					itr.remove();
				}
			}
			nextPruneTime = System.currentTimeMillis() + 20 * 60 * 1000;
		}

		switch (rh.readByte()) {
			case 0x04: // Create guild
				if (c.getPlayer().getGuildId() > 0) {
					c.getPlayer().dropMessage(1, "이미 길드에 가입되어 있어 길드를 만들 수 없습니다.");
					return;
				} else if (c.getPlayer().getMeso() < 1500000) {
					c.getPlayer().dropMessage(1, "길드 제작에 필요한 메소 [150만 메소] 가 충분하지 않습니다.");
					return;
				}
				String guildName = rh.readMapleAsciiString();

				if (!isGuildNameAcceptable(guildName)) {
					c.getPlayer().dropMessage(1, "해당 길드 이름은 만들 수 없습니다.");
					return;
				}
				int guildId;
				guildId = ChannelServer.createGuild(c.getPlayer().getId(), guildName);
				if (guildId == 0) {
					c.getSession().writeAndFlush(MainPacketCreator.genericGuildMessage((byte) 0x1C));
					return;
				}
				c.getPlayer().gainMeso(-1500000, true, false, true);
				c.getPlayer().setGuildId(guildId);
				c.getPlayer().setGuildRank(1);
				c.getPlayer().saveGuildStatus();
				c.getSession().writeAndFlush(MainPacketCreator.createGuildInfo(c.getPlayer()));
				WideObjectHolder.getInstance().setGuildMemberOnline(c.getPlayer().getMGC(), true, c.getChannel());
				respawnPlayer(c.getPlayer());
				break;
			case 0x07: // invitation
				if (c.getPlayer().getGuildId() <= 0 || c.getPlayer().getGuildRank() > 2) { // 1 == guild master, 2 == jr
					return;
				}
				String name = rh.readMapleAsciiString();
				MapleGuildResponse mgr = MapleGuild.sendInvite(c, name);

				if (mgr != null) {
					c.getSession().writeAndFlush(mgr.getPacket());
				} else {
					Invited inv = new Invited(name, c.getPlayer().getGuildId());
					if (!invited.contains(inv)) {
						invited.add(inv);
					}
				}
				break;
			case 0x01: // accepted guild invitation
				if (c.getPlayer().getGuildId() > 0) {
					return;
				}
				guildId = rh.readInt();
				name = c.getPlayer().getName().toLowerCase();
				Iterator<Invited> itr = invited.iterator();

				while (itr.hasNext()) {
					Invited inv = itr.next();
					if (guildId == inv.gid && name.equals(inv.name)) {
						c.getPlayer().setGuildId(guildId);
						c.getPlayer().setGuildRank(5);
						itr.remove();

						int s;

						s = ChannelServer.addGuildMember(c.getPlayer().getMGC(), c);
						if (s == 0) {
							c.getPlayer().dropMessage(1, "가입하려는 길드는 이미 정원이 꽉 찼습니다.");
							c.getPlayer().setGuildId(0);
							return;
						}
						c.getSession().writeAndFlush(MainPacketCreator.showGuildInfo(c.getPlayer()));
						c.getPlayer().saveGuildStatus();
						respawnPlayer(c.getPlayer());
						break;
					}
				}
				break;
			case 0x0B: // leaving
				int cid = rh.readInt();
				name = rh.readMapleAsciiString();

				if (cid != c.getPlayer().getId() || !name.equals(c.getPlayer().getName()) || c.getPlayer().getGuildId() <= 0) {
					return;
				}
				ChannelServer.leaveGuild(c.getPlayer().getMGC());
				c.getSession().writeAndFlush(MainPacketCreator.showGuildInfo(null));
				c.getPlayer().setGuildId(0);
				c.getPlayer().saveGuildStatus();
				respawnPlayer(c.getPlayer());
				break;
			case 0x0C: // Expel
				cid = rh.readInt();
				name = rh.readMapleAsciiString();

				if (c.getPlayer().getGuildRank() > 2 || c.getPlayer().getGuildId() <= 0) {
					return;
				}
				ChannelServer.expelMember(c.getPlayer().getMGC(), name, cid);
				break;
			case 0x12: // Guild rank titles change
				if (c.getPlayer().getGuildId() <= 0 || c.getPlayer().getGuildRank() != 1) {
					return;
				}
				String ranks[] = new String[5];
				for (int i = 0; i < 5; i++) {
					ranks[i] = rh.readMapleAsciiString();
				}
				ChannelServer.changeRankTitle(c.getPlayer().getGuildId(), ranks);
				break;
			case 0x13: // Rank change
				cid = rh.readInt();
				byte newRank = rh.readByte();

				if ((newRank <= 1 || newRank > 5) || c.getPlayer().getGuildRank() > 2 || (newRank <= 2 && c.getPlayer().getGuildRank() != 1) || c.getPlayer().getGuildId() <= 0) {
					return;
				}
				ChannelServer.changeRank(c.getPlayer().getGuildId(), cid, newRank);
				break;
			case 0x14: // Guild emblem change
				if (c.getPlayer().getMeso() < 5000000) {
					c.getPlayer().dropMessage(1, "길드 마크를 추가/수정 하기 위한 메소 [500만 메소] 가 충분하지 않습니다.");
					return;
				}
				short bg = rh.readShort();
				byte bgcolor = rh.readByte();
				short logo = rh.readShort();
				byte logocolor = rh.readByte();
				ChannelServer.setGuildEmblem(c.getPlayer().getGuildId(), bg, bgcolor, logo, logocolor);
				c.getPlayer().gainMeso(-5000000, true, false, true);
				respawnPlayer(c.getPlayer());
				break;
			case 0x23: //길드스킬 구매
				int skillid = rh.readInt();
				byte level = rh.readByte();
				ISkill skilli = SkillFactory.getSkill(skillid);
				if (c.getPlayer().getGuildId() <= 0 || skilli == null || skilli.getId() < 91000000) {
					return;
				}
				int eff = ChannelServer.getSkillLevel(c.getPlayer().getGuildId(), skilli.getId()) + 1;
				if (eff > skilli.getMaxLevel()) {
					return;
				}

				final SkillStatEffect skill = skilli.getEffect(eff);

				if (ChannelServer.purchaseSkill(c.getPlayer().getGuildId(), skill.getSourceId(), c.getPlayer().getName(), c.getPlayer().getId(), level)) {
					c.getPlayer().gainMeso(-skill.getPrice(), true);
				}
				break;
			case 0x24: { //길드 스킬 활성화
				skilli = SkillFactory.getSkill(rh.readInt());
				if (c.getPlayer().getGuildId() <= 0 || skilli == null) {
					return;
				}
				eff = ChannelServer.getSkillLevel(c.getPlayer().getGuildId(), skilli.getId()) + 1;
				if (eff <= 0) {
					return;
				}
				final SkillStatEffect skillii = skilli.getEffect(eff);

				if (ChannelServer.activateSkill(c.getPlayer().getGuildId(), skillii.getSourceId(), c.getPlayer().getName())) {
					c.getPlayer().gainMeso(-skillii.getExtendPrice() * 10000, true);
				}
				break;
			}
			/*case 0x25: // 길드스킬 발동
				int activeSkillId = rh.readInt();
				if (ChannelServer.activateSkill(c.getPlayer().getGuildId(), activeSkillId, c.getPlayer().getName())) {
					if (activeSkillId == 91001016) {
						int playerid = rh.readInt();
						if (c.getPlayer().getGuildIGP() >= 1400) {
							MapleCharacter who = c.getChannelServer().getPlayerStorage().getCharacterById(playerid);
							MapleMap map = who.getClient().getChannelServer().getMapFactory().getMap(who.getMapId());
							c.getPlayer().changeMap(map, map.getPortal(0));
							c.getPlayer().loseGuildIGP(1400);
							c.getSession().write(MainPacketCreator.guildInfoUpdate(c.getPlayer().getGuild().getId(), c.getPlayer().getId(), c.getPlayer()));
						}
					} else if (activeSkillId == 91001017) {
						int playerid = rh.readInt();
						if (c.getPlayer().getGuildIGP() >= 1400) {
							MapleCharacter who = c.getChannelServer().getPlayerStorage().getCharacterById(playerid);
							MapleMap map = who.getClient().getChannelServer().getMapFactory().getMap(c.getPlayer().getMapId());
							who.changeMap(map, map.getPortal(0));
							c.getPlayer().loseGuildIGP(1400);
							c.getSession().write(MainPacketCreator.guildInfoUpdate(c.getPlayer().getGuild().getId(), c.getPlayer().getId(), c.getPlayer()));
						}
					} else if (activeSkillId == 91001018) {
						if (c.getPlayer().getGuild().getGP() >= 20000) {
							for (MapleGuildCharacter guildchar : c.getPlayer().getGuild().getMembers()) {
								MapleCharacter who = c.getChannelServer().getPlayerStorage().getCharacterById(guildchar.getId());
								MapleMap map = c.getChannelServer().getMapFactory().getMap(c.getPlayer().getMapId());
								who.changeMap(map, map.getPortal(0));
								c.getPlayer().getGuild().loseGP(20000);
								c.getSession().write(MainPacketCreator.guildInfoUpdate(c.getPlayer().getGuild().getId(), c.getPlayer().getId(), c.getPlayer()));
							}
						}
					} else if (activeSkillId == 91001019) {
						if (c.getPlayer().getGuild().getGP() >= 80000) {
							String message = rh.readMapleAsciiString();
							if (message.length() > 65) {
								break;
							}
							StringBuilder sb = new StringBuilder();
							sb.append(" [" + c.getPlayer().getGuild().getName() + "] ");
							sb.append(c.getPlayer().getName());
							sb.append(" : ");
							sb.append(message);
							boolean ear = rh.readByte() != 0;
							WorldBroadcasting.broadcastSmega(MainPacketCreator.serverNotice(3, c.getChannel(), sb.toString(), ear));
							c.getPlayer().getGuild().loseGP(80000);
							c.getSession().write(MainPacketCreator.guildInfoUpdate(c.getPlayer().getGuild().getId(), c.getPlayer().getId(), c.getPlayer()));
						}
					} else if (activeSkillId == 91001020) {
						if (c.getPlayer().getGuildIGP() >= 1400) {
							for (MaplePartyCharacter partychar : c.getPlayer().getParty().getMembers()) {
								MapleCharacter who = c.getChannelServer().getPlayerStorage().getCharacterByName(partychar.getName());
								if (who != null) {
									who.getStat().setHp(who.getStat().getMaxHp(), who);
									who.updateSingleStat(PlayerStat.HP, who.getStat().getMaxHp());
								}
								c.getPlayer().loseGuildIGP(1400);
								c.getSession().write(MainPacketCreator.guildInfoUpdate(c.getPlayer().getGuild().getId(), c.getPlayer().getId(), c.getPlayer()));
							}
						}
					} else {
						c.getPlayer().Message(6, "" + activeSkillId + "" + rh.toString());
						c.getSession().write(MainPacketCreator.resetActions(c.getPlayer()));
					}
				}
				c.getPlayer().Message("[길드 스킬코드 : " + activeSkillId + "] [" + rh.toString() + "] ");
				break;*/
			case 0x28: // 길드장 위임
				cid = rh.readInt();
				if (c.getPlayer().getGuildId() <= 0 || c.getPlayer().getGuildRank() > 1) {
					return;
				}
				ChannelServer.setGuildLeader(c.getPlayer().getGuildId(), cid);
				c.getPlayer().dropMessage(1, "길드마스터가 [" + c.getPlayer().getName() + "] 님에서 [" + cid + "]님으로 변경되었습니다.");
				break;
		}
	}
}
