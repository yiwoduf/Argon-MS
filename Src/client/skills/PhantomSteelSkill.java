package client.skills;

import client.MapleCharacter;
import packet.transfer.write.WritingPacket;
import java.util.*;
import packet.skills.PhantomPacket;

/**
 *
 * @author T-Sun
 *
 * This file was written by T-Sun (doomgate17@naver.com)
 *
 *
 *
 */
public class PhantomSteelSkill {

    // * 리스트 하나로 처리도 가능할 것 같은데.. 지금은 패스.
    List<SteelSkillEntry> job1Skills = new ArrayList<SteelSkillEntry>();
    List<SteelSkillEntry> job2Skills = new ArrayList<SteelSkillEntry>();
    List<SteelSkillEntry> job3Skills = new ArrayList<SteelSkillEntry>();
    List<SteelSkillEntry> job4Skills = new ArrayList<SteelSkillEntry>();
    List<SteelSkillEntry> jobHyperSkills = new ArrayList<SteelSkillEntry>();

    public int getNextFreeSlot(int index) {
        List<SteelSkillEntry> task;
        if (index == 1) {
            task = job1Skills;
        } else if (index == 2) {
            task = job2Skills;
        } else if (index == 3) {
            task = job3Skills;
        } else if (index == 4) {
            task = job4Skills;
        } else if (index == 5) {
            task = jobHyperSkills;
        } else {
            System.err.println("[오류] 인덱스가 해당하지 않는 번호입니다.");
            return -1;
        }
        int lastfree = 1;
        for (SteelSkillEntry sse : task) {
            if (sse.getSlot() > lastfree + 1) {
                return lastfree;
            }
            lastfree++;
        }
        return lastfree;
    }

    public void addSkill(int index, SteelSkillEntry entry) {
        if (index == 1 && job1Skills.size() < 4) {
            entry.setSlot(getNextFreeSlot(index));
            job1Skills.add(entry);
        } else if (index == 2 && job2Skills.size() < 4) {
            entry.setSlot(getNextFreeSlot(index));
            job2Skills.add(entry);
        } else if (index == 3 && job3Skills.size() < 3) {
            entry.setSlot(getNextFreeSlot(index));
            job3Skills.add(entry);
        } else if (index == 4 && job4Skills.size() < 2) {
            entry.setSlot(getNextFreeSlot(index));
            job4Skills.add(entry);
        } else if (index == 5 && jobHyperSkills.size() < 2) {
            entry.setSlot(getNextFreeSlot(index));
            jobHyperSkills.add(entry);
        } else {
            System.err.println("[오류] 팬텀 스틸 스킬 인덱스 삽입이 잘못되었거나 사이즈 초과.");
        }
    }

    public void addSkill(int index, int slot, SteelSkillEntry entry) {
        if (index == 1 && job1Skills.size() < 4) {
            entry.setSlot(slot);
            job1Skills.add(entry);
        } else if (index == 2 && job2Skills.size() < 4) {
            entry.setSlot(slot);
            job2Skills.add(entry);
        } else if (index == 3 && job3Skills.size() < 3) {
            entry.setSlot(slot);
            job3Skills.add(entry);
        } else if (index == 4 && job4Skills.size() < 2) {
            entry.setSlot(slot);
            job4Skills.add(entry);
        } else if (index == 5 && jobHyperSkills.size() < 2) {
            entry.setSlot(slot);
            jobHyperSkills.add(entry);
        } else {
            System.err.println("[오류] 팬텀 스틸 스킬 인덱스 삽입이 잘못되었거나 사이즈 초과.");
        }
    }

    public void setEquipped(int index, int slot, boolean equipped) {
        if (index == 1) {
            job1Skills.get(slot).setEquipped(equipped);
        } else if (index == 2) {
            job2Skills.get(slot).setEquipped(equipped);
        } else if (index == 3) {
            job3Skills.get(slot).setEquipped(equipped);
        } else if (index == 4) {
            job4Skills.get(slot).setEquipped(equipped);
        } else if (index == 5) {
            jobHyperSkills.get(slot).setEquipped(equipped);
        } else {
            System.err.println("[오류] 스킬 장착에 실패하였습니다.");
        }
    }

    public SteelSkillEntry getSkillEntryById(int skillId) {
        for (int i = 1; i <= 5; ++i) {
            for (SteelSkillEntry sse : getSkillEntrys(i)) {
                if (sse.getSkillId() == skillId) {
                    return sse;
                }
            }
        }
        return null;
    }

    public boolean isExistSkill(int skillId) {
        for (int i = 1; i <= 5; ++i) {
            for (SteelSkillEntry sse : getSkillEntrys(i)) {
                if (sse.getSkillId() == skillId) { //이미 스킬이 존재함
                    return true;
                }
            }
        }
        return false;
    }

    public List<SteelSkillEntry> getSkillEntrys(int index) {
        if (index == 1) {
            return job1Skills;
        } else if (index == 2) {
            return job2Skills;
        } else if (index == 3) {
            return job3Skills;
        } else if (index == 4) {
            return job4Skills;
        } else if (index == 5) {
            return jobHyperSkills;
        } else {
            return null;
        }
    }

    public void deleteSkill(int skill) {
        int index = SteelSkillEntry.getJobIndex(skill);
        SteelSkillEntry toDelete = null;
        for (SteelSkillEntry sse : getSkillEntrys(index)) {
            if (sse.getSkillId() == skill) {
                toDelete = sse;
                break;
            }
        }
        if (toDelete != null) {
            getSkillEntrys(index).remove(toDelete);
        }
    }

    public void deleteSkill(SteelSkillEntry sse) {
        getSkillEntrys(SteelSkillEntry.getJobIndex(sse.getSkillId())).remove(sse);
    }

    public void sortSkillEntrys(int index) {
        List<SteelSkillEntry> task;
        if (index == 1) {
            task = job1Skills;
        } else if (index == 2) {
            task = job2Skills;
        } else if (index == 3) {
            task = job3Skills;
        } else if (index == 4) {
            task = job4Skills;
        } else if (index == 5) {
            task = jobHyperSkills;
        } else {
            System.err.println("[오류] 인덱스가 해당하지 않는 번호입니다.");
            return;
        }
        Comparator<SteelSkillEntry> com = new Comparator<SteelSkillEntry>() {
            @Override
            public int compare(SteelSkillEntry o1, SteelSkillEntry o2) {
                if (o1.getSlot() > o2.getSlot()) {
                    return 1;
                } else if (o1.getSlot() == o2.getSlot()) {
                    return 0;
                } else if (o1.getSlot() < o2.getSlot()) {
                    return -1;
                } else {
                    return 0;
                }
            }
        };
        Collections.sort(task, com);
        if (index == 1) {
            job1Skills = task;
        } else if (index == 2) {
            job2Skills = task;
        } else if (index == 3) {
            job3Skills = task;
        } else if (index == 4) {
            job4Skills = task;
        } else if (index == 5) {
            jobHyperSkills = task;
        }
    }

    public int get_steal_memory_maxsize(int nSlotID) {
        int result; // eax@2

        switch (nSlotID) {
            case 1:
            case 2:
                result = 4;
                break;
            case 3:
                result = 3;
                break;
            case 4:
            case 5:
                result = 2;
                break;
            default:
                result = 0;
                break;
        }
        return result;
    }

    public void sendSteelSkillInfo(MapleCharacter chr) {
        /* for (SteelSkillEntry steel : job1Skills) {
            chr.send(PhantomPacket.getSteelSkillCheck(chr.getId(), true, steel, false));
            if (steel.isEquipped()) {
                chr.send(PhantomPacket.getUpdateEquippedSkill(24001001, steel.getSkillId(), steel.getIndex(), true, false));
            }
        }
        for (SteelSkillEntry steel : job2Skills) {
            chr.send(PhantomPacket.getSteelSkillCheck(chr.getId(), true, steel, false));
            if (steel.isEquipped()) {
                chr.send(PhantomPacket.getUpdateEquippedSkill(24101001, steel.getSkillId(), steel.getIndex(), true, false));
            }
        }
        for (SteelSkillEntry steel : job3Skills) {
            chr.send(PhantomPacket.getSteelSkillCheck(chr.getId(), true, steel, false));
            if (steel.isEquipped()) {
                chr.send(PhantomPacket.getUpdateEquippedSkill(24111001, steel.getSkillId(), steel.getIndex(), true, false));
            }
        }
        for (SteelSkillEntry steel : job4Skills) {
            chr.send(PhantomPacket.getSteelSkillCheck(chr.getId(), true, steel, false));
            if (steel.isEquipped()) {
               chr.send(PhantomPacket.getUpdateEquippedSkill(24121001, steel.getSkillId(), steel.getIndex(), true, false)); 
            }
        }
        for (SteelSkillEntry steel : jobHyperSkills) {
            chr.send(PhantomPacket.getSteelSkillCheck(chr.getId(), true, steel, false));
            if (steel.isEquipped()) {
                chr.send(PhantomPacket.getUpdateEquippedSkill(24121054, steel.getSkillId(), steel.getIndex(), true, false));
            }
        }*/
    }

    public void connectData(WritingPacket wh, MapleCharacter hp) {

        /* 훔친 스킬 목록(Steel Skills List) */
        Map<Integer, Integer> equipped = new HashMap<>();
        for (int i = 1; i <= 5; ++i) {
            sortSkillEntrys(i);
            for (SteelSkillEntry sse : getSkillEntrys(i)) {
                wh.writeInt(sse.getSkillId());
                if (sse.isEquipped()) {
                    equipped.put(i, sse.getSkillId());
                }
            }
            for (int p = getSkillEntrys(i).size(); p < get_steal_memory_maxsize(i); p++) {
                wh.writeInt(0);
            }
        }

        /* 장착한 스킬 목록(Equipped Skills List) */
        for (int i = 1; i <= 5; ++i) {
            if (equipped.get(i) != null) {
                wh.writeInt(equipped.get(i));
            } else {
                wh.writeInt(0);
            }
        }
    }
}
