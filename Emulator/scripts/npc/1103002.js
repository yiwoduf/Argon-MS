var status = 0;
var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";
importPackage(Packages.constants);

function start() {
 status = -1;
 action(1, 0, 0);
}

function action(mode, type, selection) {
 if (mode == -1) {
  cm.dispose();
                 return;
 } else {
  if (mode == 1)
   status++;
  else
   status--;
     if(mode == 0){
     cm.dispose();
     return;
   }
  if (status == 0) {
	var chat = "              #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 라이딩시스템 "+별+"\r\n#fs10##Cgray#                                "+ServerConstants.serverName+"의 라이딩시스템입니다.#k\r\n\r\n#fs12##b▶ #h #님 만나서 반갑습니다.#k\r\n#r▶ 저는 "+ServerConstants.serverName+"의 라이딩마스터입니다!#k\r\n";
	chat += "#L11#모든 라이딩을 마스터하겠습니다.(사용불가)";
	cm.sendSimple(chat);

   } else if (selection == 1) {
	cm.teachSkill(80001016,1,1);
	cm.teachSkill(80001003,1,1);
	cm.teachSkill(80001004,1,1);
	cm.teachSkill(80001015,1,1);
	cm.teachSkill(80001002,1,1);
	cm.teachSkill(80001006,1,1);
	cm.teachSkill(80001007,1,1);
	cm.teachSkill(80001008,1,1);
	cm.teachSkill(80001009,1,1);
	cm.teachSkill(80001010,1,1);
	cm.teachSkill(80001011,1,1);
	cm.teachSkill(80001012,1,1);
	cm.teachSkill(80001013,1,1);
	cm.teachSkill(80001015,1,1);
	cm.teachSkill(80001017,1,1);
	cm.teachSkill(80001018,1,1);
	cm.teachSkill(80001019,1,1);
	cm.teachSkill(80001021,1,1);
	cm.teachSkill(80001022,1,1);
	cm.teachSkill(80001023,1,1);
	cm.teachSkill(80001026,1,1);
	cm.teachSkill(80001027,1,1);
	cm.teachSkill(80001028,1,1);
	cm.teachSkill(80001029,1,1);
	cm.teachSkill(80001030,1,1);
	cm.teachSkill(80001032,1,1);
	cm.teachSkill(80001037,1,1);
	cm.teachSkill(80001038,1,1);
	cm.teachSkill(80001039,1,1);
	cm.teachSkill(80001040,1,1);
	cm.teachSkill(80001041,1,1);
	cm.teachSkill(80001042,1,1);
	cm.teachSkill(80001148,1,1);
	cm.teachSkill(80001184,1,1);
	cm.teachSkill(80001198,1,1);
	cm.teachSkill(80001228,1,1);
	cm.teachSkill(80001243,1,1);
	cm.teachSkill(80001245,1,1);
	cm.teachSkill(80001300,1,1);
	cm.teachSkill(80001423,1,1);
	cm.teachSkill(80001425,1,1);
	cm.sendOk("              #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 라이딩시스템 "+별+"\r\n#fs10##Cgray#                                "+ServerConstants.serverName+"의 라이딩시스템입니다.#k\r\n\r\n#fs12##r▶ #h #님의 라이딩마스터가 성공적으로 완료되었습니다.");
	cm.dispose();
		}
	}
}