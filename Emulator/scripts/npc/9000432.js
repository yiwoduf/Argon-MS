 // Author : ���K
// Function : ����
// ����Ͻ� �� �� �ּ��� ������ ���� �ּ����� ���ڽ��ϴ�.
importPackage(java.lang);
function start() {
status = -1;
action(1, 0, 0); }

function action(mode, type, selection) {

var reward = "#fUI/UIWindow.img/QuestIcon/4/0#";
itemlist = [2050004, 2000005, 2120000, 5370000,5076000,5076000,5190010,5190001,5190003,5190006,5190000] // �����ڵ�
qty = [100,1000,100,1,100,100,1,1,1,1,1] //����
cost = [50000,50000,50000,50000,50000,50000,50000,50000,50000,50000,50000] // ����

 if (mode == -1) { 
    cm.dispose(); 
    } else {

 if (mode == 0) {
    cm.dispose(); 
    return; 
      }
 if (mode == 1)
    status++;
    else status--;    

 if (status == 0) {
    var hello  = "�ȳ��ϼ��� #b#h0##k ����!\r\n";
    for (var i = 0; i < itemlist.length; i++) {
    for (var i = 0; i < qty.length; i++) {
    for (var i = 0; i < cost.length; i++) {
    hello += "#L" +i+ "# #i"+itemlist[i] + "# #z"+itemlist[i]+"#["+qty[i]+"��] #b("+cost[i]+" �޼�)#k\r\n"
  }
}
}
    cm.sendSimple(hello);
        } else if (status == 1) {
            if(cm.getMeso() >= cost[selection]) {
               cm.gainItem(itemlist[selection], qty[selection]);
               cm.gainMeso(-cost[selection]);
               cm.sendOk("���� �ֽ��ϴ�. ����~ �����մϴ� ����~\r\n\r\n"+reward+"\r\n#i"+itemlist[selection] + "# #b[#z " + itemlist[selection]+ "#]#k");
        } else {
               cm.sendOk("�޼Ұ� �����ؿ� ����..");
    }
  
               cm.dispose();
 }

 }
}
