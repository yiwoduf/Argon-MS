importPackage(Packages.packet.creators);
importPackage(Packages.launch.world);
importPackage(Packages.main.world);
 function start() { Status = -1; action(1, 0, 0); }

 function action(M, T, S) {

  if (M == -1) { cm.dispose(); } else {
  if (M == 0) {cm.dispose(); return; }
  if (M == 1) Status++; else Status--;    

 if(Status == 0) {
 cm.sendYesNo("�޼� ��Ű���� �����Ͻðڽ��ϱ�? 50�� �޼ҿ��� 100�� �޼� ������ �ݾ��� ȹ���� �� �ֽ��ϴ�."
  +"\r\n\r\n#e#r�κ��丮 ��Ÿ ���� ���� ������ 2ĭ �̻� Ȯ�����ּ���. ���� ������ ��� �������� ���޵��� �ʴ� ��쿡 �߰� ������ ��ƽ��ϴ�.")
 }

 else if(Status == 1) {

  if(!cm.haveItem(2433019)) {
  cm.sendOk("#i2433019# #b#z2433019##k�� �ִٰ� ��ܼ� �Ǵ°� �ƴϾ�. ��, �� �κ��丮���� ���ݾ�?");
  cm.dispose();
  } else {
  cm.gainItem(2433019, -1);
  Rullet();
  cm.sendOk("������ �޼� ��Ű�鿡�� "+W+"�޼Ҹ� �����. ���� �ٷ� �κ��丮�� Ȯ���� ��.#b"
   + "\r\n\r\n #fUI/UIWindow.img/QuestIcon/7/0# "+W+" �޼�\r\n");
   if(N > 4001207 && N < 4001213) {
   WorldBroadcasting.broadcast(MainPacketCreator.getGMText(20, "[��Ÿ��] "+cm.getPlayer().getName()+" ���� �޼� ��Ű�鿡�� "+W+" �޼Ҹ� ȹ���߽��ϴ�. ��� �������ּ���~"));
   cm.gainItem(N, Q);
   } else {
   cm.gainMeso(N);
   }
  cm.dispose();
  }
 }
 }
}



function Rullet() {
M = Math.floor(Math.random() * 10000);
 switch(M) {
 // 100�￡�� 20�﾿ �����ؼ� ����
 case 0:    case 5000: N = 4001212; Q = 50; W = "100��"; break;
 case 1000: case 6000: N = 4001212; Q = 40; W = "80��"; break;
 case 2000: case 7000: N = 4001212; Q = 30; W = "60��"; break;
 case 3000: case 8000: N = 4001212; Q = 20; W = "40��"; break;
 case 4000: case 9000: N = 4001212; Q = 10; W = "20��"; break;

 // 90�￡�� 20�﾿ �����ؼ� ����
 case 100:  case 5100: N = 4001212; Q = 45; W = "90��"; break;
 case 1100: case 6100: N = 4001212; Q = 35; W = "70��"; break;
 case 2100: case 7100: N = 4001212; Q = 25; W = "50��"; break;
 case 3100: case 8100: N = 4001212; Q = 15; W = "30��"; break;
 case 4100: case 9100: N = 4001212; Q = 5;  W = "10��"; break;

 // 10�￡�� 2�﾿ �����ؼ� ����
 case 50:   case 5050: N = 4001212; Q = 5;  W = "10��"; break;
 case 1050: case 6050: N = 4001212; Q = 4;  W = "8��"; break;
 case 2050: case 7050: N = 4001212; Q = 3;  W = "6��"; break;
 case 3050: case 8050: N = 4001212; Q = 2;  W = "4��"; break;
 case 4050: case 9050: N = 4001212; Q = 1;  W = "2��"; break;

 // 9�￡�� 2�﾿ �����ؼ� ����
 case 70:   case 5070: N = 4001211; Q = 9;  W = "9��"; break;
 case 1070: case 6070: N = 4001211; Q = 7;  W = "7��"; break;
 case 2070: case 7070: N = 4001211; Q = 5;  W = "5��"; break;
 case 3070: case 8070: N = 4001211; Q = 3;  W = "3��"; break;
 case 4070: case 9070: N = 4001211; Q = 1;  W = "1��"; break;

 // 1�￡�� 5õ���� �����ؼ� ����
 case 60:   case 5060: N = 4001210; Q = 2;  W = "1��"; break;
 case 1060: case 6060: N = 4001210; Q = 1;  W = "5õ��"; break;

 // 9õ������ 3õ���� �����ؼ� ����
 case 145:  case 5145: N = 4001209; Q = 3;  W = "9õ��"; break;
 case 1145: case 6145: N = 4001209; Q = 2;  W = "6õ��"; break;
 case 2145: case 7145: N = 4001209; Q = 1;  W = "3õ��"; break;

 // 1�￡�� 1õ���� �����ؼ� ����
 case 474:  case 5474: N = 4001208; Q = 10; W = "1��"; break;
 case 1474: case 6474: N = 4001208; Q = 9;  W = "9õ��"; break;
 case 2474: case 7474: N = 4001208; Q = 8;  W = "8õ��"; break;
 case 3474: case 8474: N = 4001208; Q = 7;  W = "7õ��"; break;
 case 4474: case 9474: N = 4001208; Q = 6;  W = "6õ��"; break;
 case 873 : case 5873: N = 4001208; Q = 5;  W = "5õ��"; break;
 case 1873: case 9873: N = 4001208; Q = 4;  W = "4õ��"; break;
 case 2873: case 9873: N = 4001208; Q = 3;  W = "3õ��"; break;
 case 3873: case 9873: N = 4001208; Q = 2;  W = "2õ��"; break;
 case 4873: case 9873: N = 4001208; Q = 1;  W = "õ��"; break;

 default: N = M*1000; W = N; break;
 }
}