/*
 */
importPackage(java.lang);
importPackage(Packages.packet.creators);
importPackage(Packages.constants);

function enter(pi) {
if (pi.getQuestStatus(31149) < 2) {

if (pi.getQuestStatus(31149) == 1) {
    pi.getPlayer().send(UIPacket.showInfo("�˷������� ���� ��������."));
    pi.forceCompleteQuest(31149);
} else {
    pi.getPlayer().send(UIPacket.showInfo("�ñ׳ʽ��� ���� ����Ʈ�� Ŭ���� ���ֽʽÿ�."));
}
} else if (pi.getQuestStatus(31149) == 2) {
    pi.warp(271040000);
}
    return false;
}