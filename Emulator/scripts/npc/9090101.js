importPackage(java.lang);
var status = -1;
var point = 1000; // 후포
var point2 = 1000; // 환포
var damage = 10000000;
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    }
    if (mode == 0 || mode == -1) {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSimple("#fs13##d 후원 가즈아!~! \r\n 홍보 가즈아!~!");

}