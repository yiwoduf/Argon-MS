/*
 Maple Team ProJect
 제작 용도 : 서버운영용
 팀원목록
 * 강동원 dongwon1852@nate.com 
 * 김선일 fileupload@nate.com
 * 김석현 azxcs3@nate.com
 * 김진성 m0nday_s@nate.com
 * 공준협 kkong1001@nate.com
 * 김민호 rubystory0603@nate.com
 * 이재왕 ejwj5592@nate.com
 * 최용재 virgo_s_t@nate.com
 * 서성덕 abq1239@nate.com
 */
package scripting;

import client.MapleCharacter;
import constants.ServerConstants;
import client.MapleClient;
import java.io.File;
import server.quest.MapleQuest;
import java.util.Map;
import java.util.WeakHashMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import server.life.MapleLifeProvider;
import server.life.MapleNPC;
import tools.ScriptTool;

public class NPCScriptManager extends AbstractScriptManager {

    private final Map<MapleClient, NPCConversationManager> cms = new WeakHashMap<MapleClient, NPCConversationManager>();
    private final Map<MapleClient, Invocable> scripts = new WeakHashMap<MapleClient, Invocable>();
    private static final NPCScriptManager instance = new NPCScriptManager();
    private static ReentrantLock lock = new ReentrantLock();

    public static final NPCScriptManager getInstance() {
        return instance;
    }

    public final void start(final MapleClient c, final int npc, final String info, final MapleCharacter chr) {
        final Lock lock = c.getNPCLock();
        String scriptpath = null;
        lock.lock();
        try {
            if (!(cms.containsKey(c) && c.canClickNPC())) {
                Invocable iv;
                scriptpath = ScriptTool.findScript(String.valueOf(npc), "npc");
                iv = getInvocable("npc/" + scriptpath, c);
                if (iv == null) {
                    return;
                }
                final ScriptEngine scriptengine = (ScriptEngine) iv;
                final NPCConversationManager cm = new NPCConversationManager(c, npc, -1, (byte) -1, iv);
                if (scriptpath != null) {
                    cm.setPath(scriptpath);
                }
                cms.put(c, cm);
                scriptengine.put("cm", cm);
                c.getPlayer().setConversation(1);
                try {
                    iv.invokeFunction("start", info, chr);
                } catch (NoSuchMethodException nsme) {
                    iv.invokeFunction("action", (byte) 1, (byte) 0, 3);
                }
                if (c.getPlayer().getGMLevel() > 1) {
                    MapleNPC npcs = MapleLifeProvider.getNPC(npc);
                    c.getPlayer().dropMessage(6, "[엔피시 이름 : " + npcs.getName() + "] [엔피시 코드 : " + npcs.getId() + "]");
                }
            }
        } catch (final Exception e) {
            dispose(c);
        } finally {
            lock.unlock();
        }
    }

    public final void start(final MapleClient c, final int npc) {
        start(c, npc, null);
    }

    public final void start(final MapleClient c, final int npc, final String script) {
        lock.lock();
        try {
            if (!(cms.containsKey(c) && scripts.containsKey(c))) {
                Invocable iv;
                String scriptpath = null;
                if (script == null) {
                    //iv = getInvocable("npc/" + npc + ".js", c);
                    scriptpath = ScriptTool.findScript(String.valueOf(npc), "npc");
                    iv = getInvocable("npc/" + scriptpath, c);
                } else {
                    scriptpath = ScriptTool.findScript(script, "item");
                    iv = getInvocable("item/" + scriptpath, c);
                }
                if (iv == null && script != null) {
                    scriptpath = ScriptTool.findScript(script, "npc");
                    iv = getInvocable("npc/" + scriptpath, c);
                }
                if (iv == null) {
                    iv = getInvocable("npc/npcAutoWriter.js", c);
                }
                final ScriptEngine scriptengine = (ScriptEngine) iv;
                final NPCConversationManager cm = new NPCConversationManager(c, npc, -1, (byte) -1, iv);
                if (scriptpath != null) {
                    cm.setPath(scriptpath);
                }
                cms.put(c, cm);
                scriptengine.put("cm", cm);
                c.getPlayer().setConversation(1);
                scripts.put(c, iv);
                try {
                    iv.invokeFunction("start"); // Temporary until I've removed all of start
                } catch (NoSuchMethodException nsme) {
                    iv.invokeFunction("action", (byte) 1, (byte) 0, 0);
                }
                if (c.getPlayer().getGMLevel() > 1) {
                    MapleNPC npcs = MapleLifeProvider.getNPC(npc);
                    c.getPlayer().dropMessage(6, "[엔피시 이름 : " + npcs.getName() + "] [엔피시 코드 : " + npcs.getId() + "]");
                }
            }
        } catch (final Exception e) {
            //    if (!AboutMaple.realese) e.printStackTrace();
            if (script == null) {
                System.err.println("[오류] 엔피시 스크립트 실행에 실패했습니다. : " + npc);
                e.printStackTrace();
            } else {
                System.err.println("[오류] 엔피시 스크립트 실행에 실패했습니다. : " + npc);
                e.printStackTrace();
            }
            dispose(c);
        } finally {
            lock.unlock();
        }
    }

    public final void action(final MapleClient c, final byte mode, final byte type, final int selection, final int selection2) {
        if (mode != -1) {
            try {
                final NPCConversationManager cm = cms.get(c);
                if (cm.pendingDisposal) {
                    dispose(c);
                } else {
                    cm.getIv().invokeFunction("action", mode, type, selection, selection2);
                }
            } catch (final Exception e) {
                System.err.println("Error executing NPC script, NPC ID : " + ".");
                e.printStackTrace();
                dispose(c);
            }
        }
    }

    public final void action(final MapleClient c, final byte mode, final byte type, final int selection) {
        if (mode != -1) {
            try {
                if (cms.get(c).pendingDisposal) {
                    dispose(c);
                } else {
                    scripts.get(c).invokeFunction("action", mode, type, selection);
                }
            } catch (final Exception e) {
                //e.printStackTrace();
                //System.err.println("Error executing NPC script : " + cms.get(c).getNpc());
                e.printStackTrace();
                dispose(c);
            }
        }
    }

    public final void startQuest(final MapleClient c, final int npc, final int quest) {
        if (!MapleQuest.getInstance(quest).canStart(c.getPlayer(), null)) {
            return;
        }
        lock.lock();
        try {
            if (!(cms.containsKey(c) && scripts.containsKey(c))) {
                final Invocable iv = getInvocable("quest/" + quest + ".js", c);
                final ScriptEngine scriptengine = (ScriptEngine) iv;
                if (iv == null) {
                    if (MapleQuest.getInstance(quest).getMedalItem() > 0 && MapleQuest.getInstance(quest).getMedalItem() != 1142249) {
                        c.getPlayer().gainMedalReward(MapleQuest.getInstance(quest).getMedalItem());
                        MapleQuest.getInstance(quest).forceComplete(c.getPlayer(), quest);
                        return;
                    }
                    return;
                }
                final NPCConversationManager cm = new NPCConversationManager(c, npc, quest, (byte) 0, iv);
                cms.put(c, cm);
                scriptengine.put("qm", cm);

                c.getPlayer().setConversation(1);

                scripts.put(c, iv);

                iv.invokeFunction("start", (byte) 1, (byte) 0, 0); // start it off as something
            }
        } catch (final Exception e) {
            //  System.err.println("Error executing Quest script. (" + quest + ")" + e);
            dispose(c);
        } finally {
            lock.unlock();
        }
    }

    public final void startQuest(final MapleClient c, final byte mode, final byte type, final int selection) {
        try {
            if (cms.get(c).pendingDisposal) {
                dispose(c);
            } else {
                scripts.get(c).invokeFunction("start", mode, type, selection);
            }
        } catch (Exception e) {
//		System.err.println("Error executing Quest script. (" + c.getQM().getQuestId() + ")" + e);
            dispose(c);
        }
    }

    public final void endQuest(final MapleClient c, final int npc, final int quest, final boolean customEnd) {
        if (!customEnd && !MapleQuest.getInstance(quest).canComplete(c.getPlayer(), null)) {
            return;
        }
        lock.lock();
        try {
            if (!(cms.containsKey(c) && scripts.containsKey(c))) {
                final Invocable iv = getInvocable("quest/" + quest + ".js", c);
                final ScriptEngine scriptengine = (ScriptEngine) iv;
                if (iv == null) {
                    dispose(c);
                    return;
                }
                final NPCConversationManager cm = new NPCConversationManager(c, npc, quest, (byte) 1, iv);
                cms.put(c, cm);
                scriptengine.put("qm", cm);

                c.getPlayer().setConversation(1);

                scripts.put(c, iv);

                iv.invokeFunction("end", (byte) 1, (byte) 0, 0); // start it off as something
            }
        } catch (Exception e) {
            //   System.err.println("Error executing Quest script. (" + quest + ")" + e);
            dispose(c);
        } finally {
            lock.unlock();
        }
    }

    public final void endQuest(final MapleClient c, final byte mode, final byte type, final int selection) {
        try {
            if (cms.get(c).pendingDisposal) {
                dispose(c);
            } else {
                scripts.get(c).invokeFunction("end", mode, type, selection);
            }
        } catch (Exception e) {
//		System.err.println("Error executing Quest script. (" + c.getQM().getQuestId() + ")" + e);
            dispose(c);
        }
    }

    public final void dispose(final MapleClient c) {
        final NPCConversationManager npccm = cms.get(c);
        if (npccm != null) {
            cms.remove(npccm.getC());
            scripts.remove(npccm.getC());

            if (npccm.getType() == -1) {
                //c.removeScriptEngine("Emulator/Scripts/npc/" + npccm.getNpc() + ".js");
                c.removeScriptEngine("Emulator/Scripts/npc/" + npccm.getPath());
            } else {
                c.removeScriptEngine("Emulator/Scripts/quest/" + npccm.getQuest() + ".js");
            }
        }
        if (c.getPlayer().getConversation() == 1) {
            c.getPlayer().setConversation(0);
        }
    }

    public final NPCConversationManager getCM(final MapleClient c) {
        return cms.get(c);
    }

    public final void clearScript() {
        cms.clear();
        scripts.clear();
    }
}
