
importPackage(Packages.client.items);
importPackage(Packages.server.items);
importPackage(Packages.constants);

var arr = new Array(1004422,1052882,1102775,1082636,1073030,1152174,1004423,1052887,1102794,1082637,1073032,1152176,1004424,1052888,1102795,1082638,1073033,1152177,1004425,1052889,1102796,1082639,1073034,1152178,1004426,1052890,1102797,1082640,1073035,1152179);

function setItem(slot,stat,name){
	cm.getEquip(slot).setOwner(name);
	cm.getEquip(slot).setDownLevel(stat);;
	cm.getEquip(slot).setBossDamage(stat);
	cm.getEquip(slot).setAllStatP(stat);
	cm.getEquip(slot).setAllDamageP(stat);
}

function start() {
	var st = "#fn나눔고딕 Extrabold##b앱솔랩스 디펜스 시스템#k 을 통하여 더욱 강력한 힘을 발휘하세요.\r\n\r\n#d* 원하시는 앱솔랩스 디펜스를 선택 해주세요.#k\r\n\r\n                                      #b초월 포인트#k : #r"+cm.getRC()+" P#k\r\n";
	for(var i = 0;i<arr.length;i++){
		st += "#L"+arr[i]+"##d#i"+arr[i]+"# #z"+arr[i]+"#\r\n";
	}
	cm.sendSimple(st);
}

function itemCheck() {
	for(var i=0;arr.length;i++){
		if(cm.haveItem(arr[i])){return true;}			
	}
	for(var i=0;arr.length;i++){
		if(!cm.haveItem(arr[i])){return false;}			
	}
}

var status = -1;
var item;
var stat;
var name;
var cost;
var sel;
var slot = -1;

function action(m,t,s){
	m==1?status++:m==0?status--||cm.dispose():cm.dispose();
	if(status == 0){
		sel = s;
		if(s == 1){
			if(itemCheck() == true){
				var str = "#fn나눔고딕 Extrabold##d소지중인 아이템 목록 입니다.#k\r\n";
				for(var i=1;i < cm.getInventory(1).getSlotLimit(); i++){
					if(cm.getEquip(i)){
						for(var k=0;k<arr.length;k++){
							if(cm.haveItem(arr[k])){
								if(cm.getEquip(i).getItemId() == arr[k]){
									str += "#L"+i+"#";
									str += "#i"+cm.getEquip(i).getItemId()+"#";
									str += "\t#b(#z"+cm.getEquip(i).getItemId()+"#)";
									str += "\t#k등급 : "+cm.getEquip(i).getOwner()+"\r\n";
									break;
								}
							}
						}
					}
				}
				cm.sendSimple(str);
			}else{
				cm.sendOk("#fn나눔고딕 Extrabold##r현재 업그레이드 가능한 아이템이 없습니다.#k");
				cm.dispose();
			}
		}else{
			item = s;
			var t="#fn나눔고딕 Extrabold##fs13##d능력치#k ─ #d(올스텟/보스데미지/총데미지/착용감소레벨)#k#fs11#\r\n";
			t+="#b하급 등급#k  ───  (10% / 10% / 10% / -10)#k\r\n";
			t+="#b중급 등급#k  ───  (20% / 20% / 20% / -20)#k\r\n";
			t+="#r상급 등급#k  ───  (30% / 30% / 30% / -30)#k\r\n\r\n";
			t+="#fs12##d* 원하시는 아이템의 등급을 골라주세요.\r\n* 교환에는 M 코인 200 개가 추가로 소모됩니다.#k\r\n"
			t+="#L1##b하급#k #d(1000 P)#k";
			t+="#L2##b중급#k #d(1500 P)#k";
			t+="#L3##r상급#k #d(2000 P)#k\r\n";
			cm.sendSimple(t);
		}
	}else if(status == 1){
		if(sel != 1){
			s==1?name="하급":s==2?name="중급":s==3?name="상급":name="미사용";
			stat = s*10;
			s==1?cost = 1000:s==2?cost=1500:s==3?cost=2000:cost=0;
			cm.sendNext("#fn나눔고딕 Extrabold##i"+item+"##b "+(name)+"#k #d(#z"+item+"#)#k #r- "+cost+" 초월 포인트#k\r\n\r\n해당 아이템을 지금 바로 교환 하시겠습니까?\r\n교환을 원하시면 다음을 눌러주세요.\r\n\r\n#Cgray#(교환을 원치 않으시면 대화 그만하기를 눌러주세요.)#k");
		}
	}else if(status == 2){
		if(slot<1000){
		if(cm.canHold(item)){
		if(cm.haveItem(4310175, 200)) {
			if(cm.getRC() >= cost){
				var Item = BOWN29.getInstance().getEquipById(item);
				Item.setDownLevel(stat);
				Item.setBossDamage(stat);
				Item.setAllStat(stat);
				Item.setTotalDamage(stat);
				Item.setOwner(name);
				MapleInventoryManipulator.addFromDrop(cm.getC(), Item, false);
				cm.gainRC(-cost);
				cm.gainItem(4310175, -200);
				cm.sendOk("#fn나눔고딕 Extrabold##b성공적으로 교환 하셨습니다.#k");
			}else{
				cm.sendOk("#fn나눔고딕 Extrabold##r초월 포인트가 부족합니다.#k");
			}
		}else{
			cm.sendOk("#fn나눔고딕 Extrabold##r교환을 위한 M 코인이 부족합니다.#k");
		}
		}else{
			cm.sendOk("#fn나눔고딕 Extrabold##r인벤토리 장비 창이 부족합니다.#k");
		}
		}
		cm.dispose();
	}else{
		cm.dispose();
	}
}