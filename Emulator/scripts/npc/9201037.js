/*������ : ��ǳ��
  �Ƿ��� : ��Ŭ����*/
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
	cm.sendOk("#t"+need+"# (��)�� �����մϴ�.");
	cm.dispose(); return;
	} else {
	status = 2;
	}
    } else if (mode == 1) {
        status++;
    }
    if (status == 0) {
	if(!cm.haveItem(need)) {
	cm.sendOk("#t"+need+"# (��)�� �����մϴ�.");
	cm.dispose(); return;
	} else {
	cm.sendSimple("����ų� ���縦 �����Ͻ� �������� ���� �� �ּ���.\r\n "+cm.getAllEquip());
	}
    } else if (status == 1) {
	eq = cm.getEquip(selection);
	if(eq.getPotential6 () != 0) {
		cm.sendYesNo("���� ����ų� ����ɷ�ġ�� �����Ͻðڽ��ϱ�?");
	} else {
		cm.sendOk("�ش� �������� ����ų� ����ɷ��� �ο����� �ʾҰų�, ����ų� ����ɷ��� 3���� �ƴմϴ�.");
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
	var text = "#e#b#t"+eq.getItemId()+"##k ������ :\r\n#L0##r#e< Before >#n#k#fs11#\r\n1��° ����ų� : "+name(eq.getPotential4())+"\r\n2��° ����ų� : "+name(eq.getPotential5())+"\r\n3��° ����ų� : "+name(eq.getPotential6());
		text += "#l\r\n\r\n#L1##fs13##r#e< After >#n#k #fs11##e#r\r\n1��° ����ų� : "+name(option)+"\r\n2��° ����ų� : "+name(option2)+"\r\n3��° ����ų� : "+name(option3_sbal);
		text += "#e#l\r\n\r\n#L2#�ѹ� �� ������"+option+","+option2+","+option3_sbal;
	cm.sendSimple(text);
    } else if (status == 3) {
	if(selection == 0) {
		cm.sendOk("����ɷ��� �����Ǿ����ϴ�.");
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
		cm.sendOk("����ɷ��� ����Ǿ����ϴ�.");
		cm.dispose(); 
		return;
	}
    }
}

function name(code) {
	switch(code) {
case 40356:
return "�ǰ� �� 10% Ȯ���� �������� 20% ����";
break;
case 40357:
return "�ǰ� �� 10% Ȯ���� �������� 40% ����";
break;
case 42060:
return "ũ��Ƽ�� �ּ� ������ : 2%";
break;
case 42062:
return "ũ��Ƽ�� �ּ� ������ : 2%";
break;
		case 42041:
			return "STR : 7%";
			break;
case 60068:
return "STR : 6%";
break;
case 60047:
return "�ǰ� �� 5% Ȯ���� �������� 4% ����";
break;
case 60057:
return "���� ���� ���� �� ������ : 35%";
break;
case 60067:
return "�ý��� : 6%";
break;
case 60070:
return "INT : 6%";
break;

case 60035:
return "���� : 4%";
break;
case 60065:
return "ũ��Ƽ�� Ȯ�� : 6%";
break;
case 60038:
return "�ý��� : 3%";
break;
case 60044:
return "�ǰ� �� 5% Ȯ���� �������� 1% ����";
break;
case 60037:
return "�� ������ : 3%";
break;
case 60045:
return "�ǰ� �� 5% Ȯ���� �������� 2% ����";
break;
case 60062:
			return "INT : 9%";
			break;
		case 60051:
			return "���� ����� ���� : 4%";
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
			return "���� �� 10% Ȯ���� 2���� ����ȿ�� ����";
			break;
		case 40086:
			return "�ý��� : 9%";
			break;	
		case 42065:
			return "INT : 12%";
			break;
	case 60039:
			return "���� ���� ���� �� ������ : 3%";
			break;
		case 40292:
			return "���� �� ������ ����� : + 40%";
			break;
		case 42087://32087 //3208622070
			return "�ý��� : 9%";
			break;
              case 22087:
			return "�ý��� : 3%";
			break;
              case 22070:
			return "�� ������ : 6%";
			break;
              case 22201:
			return "���� �� 3% Ȯ���� 53�� HP ȸ��";
			break;
		case 60021:
			return "ũ��Ƽ�� �ִ� ������ : + 10%";
			break;
		case 40092:
			return "ĳ���� ���� 10���� �� ���� :+ 1";
			break;	
		case 40052:
			return "���� : 12%";
			break;	
		case 60026:
			return "���� : 12%";
			break;	
		case 60033:
			return "ĳ���� ���� 10���� �� �ý��� : + 2";
			break;
                case 60061:
                        return "DEX : 9%";	
                        break;		
		case 42054:
			return "���� 1% ~ 2%";
			break;
		case 42551:
			return "HP ȸ�� ������ �� ȸ�� ��ų ȿ�� 10% ~ 30%";
			break;
		case 42066:
			return "LUK : 12 %";
			break;
	case 60053://�ǰ� �� 5% Ȯ���� �������� 3% ����
			return "ũ��Ƽ�� Ȯ�� : 3%";
			break;
	case 60046://�ǰ� �� 5% Ȯ���� �������� 3% ����
			return "�ǰ� �� 5% Ȯ���� �������� 3% ����";
			break;
	case 60036:
			return "ũ��Ƽ�� Ȯ�� : 8%";
			break;
	case 60048:
			return "���� ����� ���� : 1% ";
			break;
	case 60056:
			return "�� ������ : 9% ";
			break;
	case 60052:
			return "ũ��Ƽ�� Ȯ�� : 1% ";
			break;
	case 60055:
			return "ũ��Ƽ�� Ȯ�� : 4% ";
			break;
	case 60058:
			return "ũ��Ƽ�� Ȯ�� : 10% ";
			break;
	case 60073:
			return "�ý��� : 3% ";
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
			return "���� ����� ���� : 3% ";
			break;
	case 60049:
			return "���� ����� ���� : 2% ";
			break;
	case 60054:
			return "ũ��Ƽ�� Ȯ�� : 3% ";
			break;
	case 60059:
			return "�ִ� HP : 20%";
			break;
		case 60034:
			return "���ݷ� : 4%";
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
			return "���� : 12%";
			break;
		case 40603:
			return "���� ���� �� ������  :+ 40%";
			break;
		case 60024:
			return "���� ���� �� ������ : + 10%";
			break;
		case 60022:
			return "���� �̻� ���� : 10%";
			break;
		case 40601:
			return "���� ���� �� ������ : 30%";
			break;
		case 42096:
			return "ĳ���� ���� 10���� �� ���� : + 1";
			break;
		case 40055:
			return "ũ��Ƽ�� Ȯ�� : 12%";
			break;
		case 42093:
			return "ĳ���� ���� 10���� �� INT : + 2";
			break;
		case 60015:
			return "���� �� 20% Ȯ���� 2���� ���ο�ȿ�� ����";
			break;
		case 60010:
			return "���� �� ������ ����� : 30%";
			break;
		case 42601:
			return "���� ���� �� ������ : + 3%";
			break;
		case 60028:
			return "ĳ���� ���� 10���� �� STR : + 4";
			break;
		case 40291:
			return "���� �� ������ ����� : + 35";
			break;
		case 60020:
			return "ũ��Ƽ�� �ּ� ������ : + 10%";
			break;
		case 42011:
			return "���ݷ� : + 14";
			break;
		case 42656:
			return "������ ȹ��Ȯ�� : + 5%";
			break;
		case 42650:
			return "�޼� ȹ�淮 : + 5%";
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
			return "���� : + 14";
			break;
		case 42007:
			return "����ġ : + 96";
			break;
		case 42014:
			return "�������� : + 200";
			break;
		case 42086:
			return "�ý��� : + 5%";
			break;
		case 42058:
			return "ũ��Ƽ�� Ȯ�� : + 2%";
			break;
		case 40107:
			return "��� ��ų���� : + 3";
			break;
		case 40048:
			return "ȸ��ġ : + 12%";
			break;
		case 60009:
			return "�� ������ : + 5%";
			break;
		case 60003:
			return "���� ���� �� ������ : + 30%";
			break;
		case 42116:
			return "���� �̻� ���� : + 5%";
			break;
		case 60019:
			return "ũ��Ƽ�� Ȯ�� : + 10%";
			break;
		case 60004:
			return "�ý��� : + 5%";
			break;
		case 60014:
			return "���� �� 10% Ȯ���� 2���� ����ȿ�� ����";
			break;
		case 60011:
			return "���� ���� �� ������ : + 30%";
			break;
		case 42095:
			return "ĳ���� ���� 10���� �� ���ݷ� : + 1";
			break;
		case 42292:
			return "���� �� ������ ����� + 5";
			break;
		case 60029:
			return "ĳ���� ���� 10���� �� DEX : + 4";
			break;
		case 60031:
			return "ĳ���� ���� 10���� �� LUK : + 3";
			break;
		case 60023:
			return "���� �� ������ ����� : + 10";
			break;
		case 60007:
			return "MaxHP : + 10%";
			break;
		case 60002:
			return "�ý��� : + 20%";
			break;
		case 42046:
			return "MaxMP : + 10%";
			break;
		case 60012:
			return "ũ��Ƽ�� Ȯ�� : + 10%";
			break;
		case 42602:
			return "���� ���� �� ������ : + 18%";
			break;
		case 40091:
			return "ĳ���� ���� 10���� �� ���ݷ� : + 1";
			break;
		case 42053:
			return "���� : + 12%";
			break;
		case 60001:
			return "�� ������ : + 12%";
			break;
		case 60016:
			return "���� �� 20% Ȯ���� 3���� ����ȿ�� ����";
			break;
		case 60008:
			return "���ݷ�/���� : + 10";
			break;
		case 60005:
			return "�ý��� : 10%";
			break;
		case 60017:
			return "���� �� 10% Ȯ������ 2���� ����ȿ�� ����";
			break;
		case 60027:
			return "���� �� ������ ����� : + 40";
			break;
		case 60006:
			return "MaxHP : 5%";
			break;
		case 60025:
			return "���ݷ� : 12%";
			break;
		case 42057:
			return "ũ��Ƽ�� Ȯ�� : + 12%";
			break;
		case 40070:
			return "�� ������ : 12%";
			break;
		case 40051:
			return "���ݷ� : 12%";
			break;
		case 40044:
			return "LUK : 12%";
			break;
		case 40048:
			return "ȸ��ġ 12%";
			break;
		case 42006:
			return "MaxMP 300";
			break;
		case 41006:
			return "������ ���꽺�� ����";
			break;
		case 42048:
			return "ȸ��ġ 12%";
			break;
		case 42106:
			return "��� ��ų���� + 2";
			break;
		case 40053:
			return "�������� 12%";
			break;
		case 42661:
			return "����ġ ȹ�� 5%";
			break;
		case 40081:
			return "�ý��� 12%";
			break;
		case 40557:
			return "��� ��ų�� ���� ���ð� : - 2��";
			break;
		case 40556:
			return "��� ��ų�� ���� ���ð� : - 1��";
			break;
		case 42091:
			return "ĳ���� ���� 10���� �� STR + 2";
			break;
		case 42005:
			return "MaxHP + 300";
			break;
		case 42556:
			return "��� ��ų�� ���� ���ð� : - 1��";
			break;
		case 40046:
			return "MaxMP + 12%";
			break;
		case 42055:
			return "�������� + 10%";
			break;
		case 40551:
			return "HP ȸ�� ������ �� ȸ�� ��ų ȿ�� + 40%";
			break;
		case 42094:
			return "ĳ���� ���� 10���� �� LUK + 2";
			break;
		case 42013:
			return "�������� + 200%";
			break;
		case 42092:
			return "ĳ���� ���� 10���� �� DEX : + 2";
			break;
		case 40106:
			return "��� ��ų���� : +2";
			break;
		case 42094:
			return "ĳ���� ���� 10���� �� LUK : + 20";
			break;
		case 42802:
			return "�ִ� ������ ���� ��� : + 10000"
			break;
		case 42052:
			return "���ݷ� : 2% "
			break;
		case 42111:
			return "��� �Ӽ� ���� : + 5%"
			break;
		case 40045:
			return "MaxHP : 12% "
			break;
		case 40047:
			return "����ġ : 12% "
			break;
		case 42056:
			return "�������� : 10% "
			break;
		case 42047:
			return "����ġ : 10% "
			break;
		case 40054:
			return "�������� : 12% "
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
			return "������ : + 14 "
			break;
		case 42070:
			return "�� ������ : + 12% "
			break;
		case 60032:
			return "ĳ���� ���� 10���� �� ü�� : + 200"
			break;
		case 60030:
			return "ĳ���� ���� 10���� �� INT : + + 4"
			break;
		case 42051:
			return "���ݷ� : 12%";
			break;
		case 60013:
			return "���� �� 10% Ȯ���� 2���� ����ȿ�� ���� �ɸ��ͱ��� 10���� ��INT : +4"
			break;
		case 42291:
			return "���� �� ������ ����� : 3%";
			break
		case 42801:
			return "�ִ� ������ ���� ��� : + 50000";
			break;		
		case 40602:
			return "���� ���� �� ������ : +35%"
			break;
		case 42008:
			return "ȸ��ġ : + 96 "
			break;	
		case 42009:
			return "�̵��ӵ� : + 14 "
			break;		
		default:
			return "null";
	}
}





