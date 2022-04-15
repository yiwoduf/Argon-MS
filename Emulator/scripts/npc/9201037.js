/*만든이 : 태풍씨
  의뢰자 : 유클리스*/
importPackage(Packages.client.items);
importPackage(Packages.constants);
importPackage(Packages.tools.RandomStream);
var status = -1;
var need = 5062500;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0 && status == 0) {
	cm.dispose();
	return;
    }
    if (mode == 0) {
        cm.dispose();
	return;
    }
    if (mode == 1 && status == 2 && selection == 2) {
	if(!cm.haveItem(need)) {
	cm.sendOk("#t"+need+"# (이)가 부족합니다.");
	cm.dispose(); return;
	} else {
	status = 2;
	}
    } else if (mode == 1) {
        status++;
    }
    if (status == 0) {
	if(!cm.haveItem(need)) {
	cm.sendOk("#t"+need+"# (이)가 부족합니다.");
	cm.dispose(); return;
	} else {
	cm.sendSimple("에디셔널 잠재를 변경하실 아이템을 선택 해 주세요.\r\n "+cm.getAllEquip());
	}
    } else if (status == 1) {
	eq = cm.getEquip(selection);
	if(eq.getPotential6 () != 0) {
		cm.sendYesNo("정말 에디셔널 잠재능력치를 변경하시겠습니까?");
	} else {
		cm.sendOk("해당 아이템은 에디셔널 잠재능력이 부여되지 않았거나, 에디셔널 잠재능력이 3줄이 아닙니다.");
		cm.dispose();
	}
    } else if (status == 2) {
	cm.gainItem(need, -1);
	ii = Packages.server.items.ItemInformation.getInstance();
        option = ii.getPotentialOptionID(5, GameConstants.getOptionType(eq.getItemId()));
        option2 = ii.getPotentialOptionID(5, GameConstants.getOptionType(eq.getItemId()));
        option3_sbal = ii.getPotentialOptionID(5, Packages.constants.GameConstants.getOptionType(eq.getItemId()));
	option1 = eq.getPotential1();
	option12 = eq.getPotential2();
	option123 = eq.getPotential3();
	var text = "#e#b#t"+eq.getItemId()+"##k 아이템 :\r\n#L0##r#e< Before >#n#k#fs11#\r\n1번째 에디셔널 : "+name(eq.getPotential4())+"\r\n2번째 에디셔널 : "+name(eq.getPotential5())+"\r\n3번째 에디셔널 : "+name(eq.getPotential6());
		text += "#l\r\n\r\n#L1##fs13##r#e< After >#n#k #fs11##e#r\r\n1번째 에디셔널 : "+name(option)+"\r\n2번째 에디셔널 : "+name(option2)+"\r\n3번째 에디셔널 : "+name(option3_sbal);
		text += "#e#l\r\n\r\n#L2#한번 더 돌리기"+option+","+option2+","+option3_sbal;
	cm.sendSimple(text);
    } else if (status == 3) {
	if(selection == 0) {
		cm.sendOk("잠재능력이 유지되었습니다.");
		cm.dispose(); return;
	} else if(selection == 1) {
		eq.setPotential1(option1);
		eq.setPotential2(option12);
		eq.setPotential3(option123);
		eq.setPotential4(option);
		eq.setPotential5(option2);
		eq.setPotential6(option3_sbal);
               cm.fakeRelog();
               cm.updateChar();
               cm.dispose();
		cm.sendOk("잠재능력이 변경되었습니다.");
		cm.dispose(); 
		return;
	}
    }
}

function name(code) {
	switch(code) {
case 40356:
return "피격 시 10% 확률로 데미지의 20% 무시";
break;
case 40357:
return "피격 시 10% 확률로 데미지의 40% 무시";
break;
case 42060:
return "크리티컬 최소 데미지 : 2%";
break;
case 42062:
return "크리티컬 최소 데미지 : 2%";
break;
		case 42041:
			return "STR : 7%";
			break;
case 60068:
return "STR : 6%";
break;
case 60047:
return "피격 시 5% 확률로 데미지의 4% 무시";
break;
case 60057:
return "보스 몬스터 공격 시 데미지 : 35%";
break;
case 60067:
return "올스탯 : 6%";
break;
case 60070:
return "INT : 6%";
break;

case 60035:
return "마력 : 4%";
break;
case 60065:
return "크리티컬 확률 : 6%";
break;
case 60038:
return "올스탯 : 3%";
break;
case 60044:
return "피격 시 5% 확률로 데미지의 1% 무시";
break;
case 60037:
return "총 데미지 : 3%";
break;
case 60045:
return "피격 시 5% 확률로 데미지의 2% 무시";
break;
case 60062:
			return "INT : 9%";
			break;
		case 60051:
			return "몬스터 방어율 무시 : 4%";
			break;
		case 42042:
			return "DEX : 7%";
			break;
		case 60069:
			return "DEX : 6%";
			break;
		case 42043:
			return "INT : 7%";
			break;
case 60060:
			return "STR : 9%";
			break;
		case 42044:
			return "LUK : 7%";
			break;
		case 60018:
			return "공격 시 10% 확률로 2레벨 봉인효과 적용";
			break;
		case 40086:
			return "올스텟 : 9%";
			break;	
		case 42065:
			return "INT : 12%";
			break;
	case 60039:
			return "보스 몬스터 공격 시 데미지 : 3%";
			break;
		case 40292:
			return "공격 시 몬스터의 방어율 : + 40%";
			break;
		case 42087://32087 //3208622070
			return "올스텟 : 9%";
			break;
              case 22087:
			return "올스텟 : 3%";
			break;
              case 22070:
			return "총 데미지 : 6%";
			break;
              case 22201:
			return "공격 시 3% 확률로 53의 HP 회복";
			break;
		case 60021:
			return "크리티컬 최대 데미지 : + 10%";
			break;
		case 40092:
			return "캐릭터 기준 10레벨 당 마력 :+ 1";
			break;	
		case 40052:
			return "마력 : 12%";
			break;	
		case 60026:
			return "마력 : 12%";
			break;	
		case 60033:
			return "캐릭터 기준 10레벨 당 올스텟 : + 2";
			break;
                case 60061:
                        return "DEX : 9%";	
                        break;		
		case 42054:
			return "마력 1% ~ 2%";
			break;
		case 42551:
			return "HP 회복 아이템 및 회복 스킬 효율 10% ~ 30%";
			break;
		case 42066:
			return "LUK : 12 %";
			break;
	case 60053://피격 시 5% 확률로 데미지의 3% 무시
			return "크리티컬 확률 : 3%";
			break;
	case 60046://피격 시 5% 확률로 데미지의 3% 무시
			return "피격 시 5% 확률로 데미지의 3% 무시";
			break;
	case 60036:
			return "크리티컬 확률 : 8%";
			break;
	case 60048:
			return "몬스터 방어율 무시 : 1% ";
			break;
	case 60056:
			return "총 데미지 : 9% ";
			break;
	case 60052:
			return "크리티컬 확률 : 1% ";
			break;
	case 60055:
			return "크리티컬 확률 : 4% ";
			break;
	case 60058:
			return "크리티컬 확률 : 10% ";
			break;
	case 60073:
			return "올스탯 : 3% ";
			break;
	case 60071:
			return "LUK : 6% ";
			break;
	case 60071:
			return "LUK : 6% ";
			break;
	case 60063:
			return "LUK : 9% ";
			break;
	case 60050:
			return "몬스터 방어율 무시 : 3% ";
			break;
	case 60049:
			return "몬스터 방어율 무시 : 2% ";
			break;
	case 60054:
			return "크리티컬 확률 : 3% ";
			break;
	case 60059:
			return "최대 HP : 20%";
			break;
		case 60034:
			return "공격력 : 4%";
			break;
		case 40041:
			return "STR : 12%";
			break;
		case 42063:
			return "STR : 12%";
			break;
		case 42064:
			return "DEX : 12%"
			break;
		case 40042:
			return "덱스 : 12%";
			break;
		case 40603:
			return "보스 공격 시 데미지  :+ 40%";
			break;
		case 60024:
			return "보스 공격 시 데미지 : + 10%";
			break;
		case 60022:
			return "상태 이상 내성 : 10%";
			break;
		case 40601:
			return "보스 공격 시 데미지 : 30%";
			break;
		case 42096:
			return "캐릭터 기준 10레벨 당 마력 : + 1";
			break;
		case 40055:
			return "크리티컬 확률 : 12%";
			break;
		case 42093:
			return "캐릭터 기준 10레벨 당 INT : + 2";
			break;
		case 60015:
			return "공격 시 20% 확률로 2레벨 슬로우효과 적용";
			break;
		case 60010:
			return "공격 시 몬스터의 방어율 : 30%";
			break;
		case 42601:
			return "보스 공격 시 데미지 : + 3%";
			break;
		case 60028:
			return "캐릭터 기준 10레벨 당 STR : + 4";
			break;
		case 40291:
			return "공격 시 몬스터의 방어율 : + 35";
			break;
		case 60020:
			return "크리티컬 최소 데미지 : + 10%";
			break;
		case 42011:
			return "공격력 : + 14";
			break;
		case 42656:
			return "아이템 획득확률 : + 5%";
			break;
		case 42650:
			return "메소 획득량 : + 5%";
			break;
		case 42004:
			return "LUK : + 18";
			break;
		case 42003:
			return "INT : + 18";
			break;
		case 42001:
			return "STR : + 18";
			break;
		case 42012:
			return "마력 : + 14";
			break;
		case 42007:
			return "명중치 : + 96";
			break;
		case 42014:
			return "마법방어력 : + 200";
			break;
		case 42086:
			return "올스탯 : + 5%";
			break;
		case 42058:
			return "크리티컬 확률 : + 2%";
			break;
		case 40107:
			return "모든 스킬레벨 : + 3";
			break;
		case 40048:
			return "회피치 : + 12%";
			break;
		case 60009:
			return "총 데미지 : + 5%";
			break;
		case 60003:
			return "보스 공격 시 데미지 : + 30%";
			break;
		case 42116:
			return "상태 이상 내성 : + 5%";
			break;
		case 60019:
			return "크리티컬 확률 : + 10%";
			break;
		case 60004:
			return "올스탯 : + 5%";
			break;
		case 60014:
			return "공격 시 10% 확률로 2레벨 스턴효과 적용";
			break;
		case 60011:
			return "보스 공격 시 데미지 : + 30%";
			break;
		case 42095:
			return "캐릭터 기준 10레벨 당 공격력 : + 1";
			break;
		case 42292:
			return "공격 시 몬스터의 방어율 + 5";
			break;
		case 60029:
			return "캐릭터 기준 10레벨 당 DEX : + 4";
			break;
		case 60031:
			return "캐릭터 기준 10레벨 당 LUK : + 3";
			break;
		case 60023:
			return "공격 시 몬스터의 방어율 : + 10";
			break;
		case 60007:
			return "MaxHP : + 10%";
			break;
		case 60002:
			return "올스탯 : + 20%";
			break;
		case 42046:
			return "MaxMP : + 10%";
			break;
		case 60012:
			return "크리티컬 확률 : + 10%";
			break;
		case 42602:
			return "보스 공격 시 데미지 : + 18%";
			break;
		case 40091:
			return "캐릭터 기준 10레벨 당 공격력 : + 1";
			break;
		case 42053:
			return "마력 : + 12%";
			break;
		case 60001:
			return "총 데미지 : + 12%";
			break;
		case 60016:
			return "공격 시 20% 확률로 3레벨 암흑효과 적용";
			break;
		case 60008:
			return "공격력/마력 : + 10";
			break;
		case 60005:
			return "올스탯 : 10%";
			break;
		case 60017:
			return "상태 시 10% 확률ㄹ로 2레벨 빙결효과 적용";
			break;
		case 60027:
			return "공격 시 몬스터의 방어율 : + 40";
			break;
		case 60006:
			return "MaxHP : 5%";
			break;
		case 60025:
			return "공격력 : 12%";
			break;
		case 42057:
			return "크리티컬 확률 : + 12%";
			break;
		case 40070:
			return "총 데미지 : 12%";
			break;
		case 40051:
			return "공격력 : 12%";
			break;
		case 40044:
			return "LUK : 12%";
			break;
		case 40048:
			return "회피치 12%";
			break;
		case 42006:
			return "MaxMP 300";
			break;
		case 41006:
			return "쓸만한 어드밴스드 블레스";
			break;
		case 42048:
			return "회피치 12%";
			break;
		case 42106:
			return "모든 스킬레벨 + 2";
			break;
		case 40053:
			return "물리방어력 12%";
			break;
		case 42661:
			return "경험치 획득 5%";
			break;
		case 40081:
			return "올스텟 12%";
			break;
		case 40557:
			return "모든 스킬의 재사용 대기시간 : - 2초";
			break;
		case 40556:
			return "모든 스킬의 재사용 대기시간 : - 1초";
			break;
		case 42091:
			return "캐릭터 기준 10레벨 당 STR + 2";
			break;
		case 42005:
			return "MaxHP + 300";
			break;
		case 42556:
			return "모든 스킬의 재사용 대기시간 : - 1초";
			break;
		case 40046:
			return "MaxMP + 12%";
			break;
		case 42055:
			return "물리방어력 + 10%";
			break;
		case 40551:
			return "HP 회복 아이템 및 회복 스킬 효율 + 40%";
			break;
		case 42094:
			return "캐릭터 기준 10레벨 당 LUK + 2";
			break;
		case 42013:
			return "물리방어력 + 200%";
			break;
		case 42092:
			return "캐릭터 기준 10레벨 당 DEX : + 2";
			break;
		case 40106:
			return "모든 스킬레벨 : +2";
			break;
		case 42094:
			return "캐릭터 기준 10레벨 당 LUK : + 20";
			break;
		case 42802:
			return "최대 데미지 제한 상승 : + 10000"
			break;
		case 42052:
			return "공격력 : 2% "
			break;
		case 42111:
			return "모든 속성 내성 : + 5%"
			break;
		case 40045:
			return "MaxHP : 12% "
			break;
		case 40047:
			return "명중치 : 12% "
			break;
		case 42056:
			return "마법방어력 : 10% "
			break;
		case 42047:
			return "명중치 : 10% "
			break;
		case 40054:
			return "마법방어력 : 12% "
			break;
		case 40043:
			return "INT : 12% "
			break;
		case 42002:
			return "DEX : + 18 "
			break;
		case 42045:
			return "MaxHP + 10% "
			break;
		case 42010:
			return "점프력 : + 14 "
			break;
		case 42070:
			return "총 데미지 : + 12% "
			break;
		case 60032:
			return "캐릭터 기준 10레벨 당 체력 : + 200"
			break;
		case 60030:
			return "캐릭터 기준 10레벨 당 INT : + + 4"
			break;
		case 42051:
			return "공격력 : 12%";
			break;
		case 60013:
			return "공격 시 10% 확률로 2레벨 봉인효과 적용 케릭터기준 10레벨 당INT : +4"
			break;
		case 42291:
			return "공격 시 몬스터의 방어율 : 3%";
			break
		case 42801:
			return "최대 데미지 제한 상승 : + 50000";
			break;		
		case 40602:
			return "보스 공격 시 데미지 : +35%"
			break;
		case 42008:
			return "회피치 : + 96 "
			break;	
		case 42009:
			return "이동속도 : + 14 "
			break;		
		default:
			return "null";
	}
}





