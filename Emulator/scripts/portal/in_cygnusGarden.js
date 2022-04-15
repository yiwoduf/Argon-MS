/*
 */
importPackage(java.lang);
importPackage(Packages.packet.creators);
importPackage(Packages.constants);

function enter(pi) {
if (pi.getQuestStatus(31149) < 2) {

if (pi.getQuestStatus(31149) == 1) {
    pi.getPlayer().send(UIPacket.showInfo("알렉스한테 가서 보고하자."));
    pi.forceCompleteQuest(31149);
} else {
    pi.getPlayer().send(UIPacket.showInfo("시그너스의 정원 퀘스트를 클리어 해주십시오."));
}
} else if (pi.getQuestStatus(31149) == 2) {
    pi.warp(271040000);
}
    return false;
}