


/*

	ǻ�� �ҽ�  ���� ��ũ��Ʈ �Դϴ�. (���� : ��ũ��) - �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	Ȳȥ �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 9010017

	���ǽ� �̸� : �������� ����

	���ǽð� �ִ� �� : ���丮�Ʒε� : �����Ͼ� (180000000)

	���ǽ� ���� : MISSINGNO


*/

var status = -1;
importPackage(Packages.launch);
var select = -1;
var time = -1;
var rate = -1;
function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        if (cm.getPlayer().hasGmLevel(6)) {
	var cps = "#e";
	cps +="#L1#����ġ ��������\r\n";
	cps +="#L2#��� ��������\r\n";
	cps +="#L3#�޼� ��������\r\n";
	cps +="#L9#ȯ�� ��������\r\n";
	cps +="#L10#�Ŀ�����Ʈ ���\r\n"
	cps +="#L11#ȯ������Ʈ ���\r\n"
	cps +="#L4#������ �����ϱ�\r\n";
	cps +="#L5#������ ��������\r\n";
	cps +="#L6#�������� �˾ƺ���\r\n";
	cps +="#L7#��� �����ڵ� ����\r\n";
	//cps +="#L8#�ݰ� ��й�ȣor�����ۼ���\r\n#k";
	}
	cm.sendSimple(cps);

   } else if (status == 1) {
        select = selection;
        if (selection == 0) {
            cm.sendGetText("�̺�Ʈ�޼���");
        } else if (selection == 1) {
            cm.sendGetNumber("���Ͻô� ����ġ������ �������ּ���.",1,1,1000);
        } else if (selection == 2) {
            cm.sendGetNumber("���Ͻô� ��������� �������ּ���.",1,1,1000);
        } else if (selection == 3) {
            cm.sendGetNumber("���Ͻô� �޼ҹ����� �������ּ���.",1,1,1000);
        } else if (selection == 9) {
            cm.sendGetNumber("���Ͻô� ȯ�������� �������ּ���.",1,1,1000);
        } else if (selection == 4) {
            cm.dispose();
            cm.openNpc(3000107);
        } else if (selection == 5) {
            cm.dispose();
            cm.openNpc(9090008);
        } else if (selection == 6) {
            cm.dispose();
            cm.openNpc(2470044);
        } else if (selection == 8) {
            cm.dispose();
            cm.openNpc(2420039);
        } else if (selection == 9) {
            cm.dispose();
            cm.openNpc(9900001);
        } else if (selection == 10) {
            cm.sendGetNumber("�ް���� �Ŀ�����Ʈ �ݾ��� �����ּ���.",1,1,9999999);
        } else if (selection == 11) {
            cm.sendGetNumber("�ް���� ȯ������Ʈ �ݾ��� �����ּ���.",1,1,9999999);
	} else if (selection == 7) {
                var adc1 = "#r#e�����ڵ� ����Դϴ�. ���(900)#n#k\r\n\r\n";
                adc1 += "#e================<#d#e����(100)#k>===============#n\r\n";
		adc1 += "#r������#k(110)#rũ�缼�̴�#k(111)#r�����#k(112)\r\n";
		adc1 += "#b������#k(120)#b����Ʈ#k(121)#b�ȶ��#k(122)\r\n";
		adc1 += "#g���Ǿ��#k(130)#g����#k(131)#g��ũ����Ʈ#k(132)\r\n";
		adc1 += "#e================<#d#e������(200)#k>===============#n\r\n";
		adc1 += "#r�ҵ�#k(210)#r�ҵ�#k(211)#r�ҵ�#k(212)\r\n";
		adc1 += "#b����#k(220)#b����#k(221)#b����#k(222)\r\n"; 
		adc1 += "#gŬ����#k(230)#g������Ʈ(231)#g���#k(232)\r\n";
		adc1 += "#e================<#d#e�ü�(300)#k>===============#n\r\n";
		adc1 += "#r����#k(310)#r������#k(311)#r���츶����#k(312)\r\n";
		adc1 += "#b���#k(320)\r���ݼ�#k(321)#r�ű�#k(322)\r\n";
		adc1 += "#e================<#d#e����(400)#k>===============#n\r\n";
		adc1 += "#r��ؽ�#k(410)#r���#k(411)#r����Ʈ�ε�#k(412)\r\n";
		adc1 += "#b����#k(420)#b����������#k(421)#b������#k(422)\r\n";
		adc1 += "#g�����̵�#k(430,431,432,433,434)\r\n";
		adc1 += "#e================<#d#e����(500)#k>===============#n\r\n";;
		adc1 += "#r��������#k(510)#r��Ŀ�Ͼ�#k(511)#r������#k(512)\r\n";
		adc1 += "#b�ǽ�����#k(520)#b��Ű��#k(521)#bĸƾ#k(522)\r\n";
		adc1 += "#gĳ����#k(501,530,531,532)\r\n";
		adc1 += "#e==============<#d#e�ñ׳ʽ�(1000)#k>=============#n\r\n";;
		adc1 += "#r�ҿ︶����#k(1100,1110,1111,1112)\r\n";
		adc1 += "#r�÷������ڵ�#k(1200,1210,1211,1212)\r\n";
		adc1 += "#r����극��Ŀ#k(1300,1310,1311,1312)\r\n";
		adc1 += "#r����Ʈ��Ŀ#k(1400,1410,1411,1412)\r\n";
		adc1 += "#r��Ʈ����Ŀ#k(1500,1510,1511,1512)\r\n";
		adc1 += "#e================<#d#e����(2200)#k>===============#n\r\n";;
		adc1 += "#b����#k(2200,2210,2211,2212,2213,2214,2215,2216,2217,2218)\r\n";
		adc1 += "#e================<#d#e�ƶ�(2100)#k>===============#n\r\n";;
		adc1 += "#g�ƶ�#k(2100,2110,2111,2112)\r\n";
		adc1 += "#e================<#d#e��Ʋ������#k>===============#n\r\n";;
		adc1 += "#r��Ʋ������#k(3200,3210,3211,3212)\r\n";
		adc1 += "#e================<#d#e���ϵ�����#k>===============#n\r\n";;
		adc1 += "#r���ϵ�����#k(3300,3310,3311,3312)\r\n";
		adc1 += "#e==================<#d#e��ī��#k>=================#n\r\n";;
		adc1 += "#r��ī��#k(3500,3510,3511,3512)\r\n";
		adc1 += "#e================<#d#e���󽽷��̾�#k>===============#n\r\n";;
		adc1 += "#b���󽽷��̾�#k(3100,3110,3111,3112)\r\n";
		adc1 += "#e================<#d#e������#k>===============#n\r\n";;
		adc1 += "#b������#k(3101,3120,3121,3122)\r\n";
		adc1 += "#e================<#d#e�޸�������#k>===============#n\r\n";;
		adc1 += "#g�޸�������#k(2300,2310,2311,2312)\r\n";
		adc1 += "#e================<#d#e����#k>===============#n\r\n";;
		adc1 += "#b����#k(2400,2410,2411,2412)\r\n";
		adc1 += "#e================<#d#e������#k>===============#n\r\n";;
		adc1 += "#r������#k(5100,5110,5111,5112)\r\n";
		adc1 += "#e================<#d#eī����#k>===============#n\r\n";;
		adc1 += "#rī����#k(6100,6110,6111,6112)\r\n";
		adc1 += "#e================<#d#e������������#k>===============#n\r\n";;
		adc1 += "#r������������#k(6500,6510,6511,6512)\r\n";
		adc1 += "#e================<#d#e��̳ʽ�#k>===============#n\r\n";;
		adc1 += "#b��̳ʽ�#k(2700,2710,2711,2712)\r\n";
		adc1 += "#e================<#d#e����#k>===============#n\r\n";;
		adc1 += "#b����#k(3600,3610,3611,3612)\r\n";
		adc1 += "#e================<#d#e����#k>===============#n\r\n";;
		adc1 += "#b����#k(2500,2510,2511,2512)\r\n";
		adc1 += "#e================<#d#eŰ�׽ý�#k>===============#n\r\n";;
		adc1 += "#bŰ�׽ý�#k(14200,14210,14211,14212)\r\n";
                cm.sendSimple(adc1);
        }
    } else if (status == 2) {
        if (select == 0) {
            var text = cm.getText();
            LoginServer.getInstance().setEventMessage(text);
            cm.dispose();
            cm.sendOk("ok");
        } else if (select == 1) {
            rate = selection;
            cm.sendGetNumber("�󸶳� �Ͻðڽ��ϱ�? ���ӽð�(��)",1,1,300000);
        } else if (select == 2) {
            rate = selection;
            cm.sendGetNumber("�󸶳� �Ͻðڽ��ϱ�?���ӽð�(��)",1,1,300000);
        } else if (select == 3) {
            rate = selection;
            cm.sendGetNumber("�󸶳� �Ͻðڽ��ϱ�?���ӽð�(��)",1,1,300000);
        } else if (select == 9) {
            rate = selection;
            cm.sendGetNumber("�󸶳� �Ͻðڽ��ϱ�?���ӽð�(��)",1,1,300000);
        } else if (select == 10) {
	cm.gainRC(selection);
	cm.sendOk("�Ŀ�����Ʈ�� ���޵Ǿ����ϴ�.");
	cm.dispose();
        
        } else if (select == 11) {
	cm.getPlayer().setReborns(selection);
	cm.sendOk("ȯ������Ʈ�� ���޵Ǿ����ϴ�.");
	cm.dispose();
        }
    } else if (status == 3) {
        if (select == 1) {
            time = selection;
            cm.setExpEvent(rate, time);
            cm.sendOk("����ġ ������ �����Ǿ����ϴ�.");
        } else if (select == 2) {
            time = selection;
            cm.setDropEvent(rate, time);
            cm.sendOk("��� ������ �����Ǿ����ϴ�.");
        } else if (select == 3) {
            time = selection;
            cm.setMesoEvent(rate, time);
            cm.sendOk("�޼� ������ �����Ǿ����ϴ�.");
        } else if (select == 9) {
            time = selection;
            cm.setMesoEvent(rate, time);
            cm.sendOk("ȯ�� ������ �����Ǿ����ϴ�.");
        }
        cm.dispose();
    }
}

