/*
�ýý�ũ��Ʈ �Ķ�������
*/

var status = 0;
var select = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var chat = "#bŬ�����ϽŰ� ȯ���մϴ�#k �������������� �Ѿ����\r\n";
            chat += "\r\n#b#L1#�������������� �Ѿ�ڽ��ϱ� ?#k#l";
                              
            cm.sendSimple(chat);
        } else if (status == 1) {
                var warpmain = "������� #b��#k�� ������ �������ֽø� �˴ϴ�\r\n";
                warpmain += "";
                //warpmain += "\r\n#L4##b#fUI/UIToolTip/Item/Equip/Star/Star# #b�ٸ� ������ �̵��� �ϰڽ��ϴ�";
                warpmain += "\r\n#L5##fUI/UIToolTip/Item/Equip/Star/Star# #b �������������� �̵��� �ϰڽ��ϴ�"; 
                //warpmain += "\r\n#L7##fUI/UIToolTip/Item/Equip/Star/Star# #b�ۼַ��� ���λ�������� �̵��ϰڽ��ϴ�";
                cm.sendSimple(warpmain);
        } else if (status == 2) {


            if (selection == 4) {
                var vlig = "���Ͻô� ���� �������ֽø� �̵����ѵ帮�ڽ��ϴ�\r\n��ſ� ���� �ǽñ⸦ �ٶ��ϴ�\r\n";
               // vlig += "\r\n#L3000500#������ �̵�";
                vlig += "\r\n#L104000000#�����ױ� �̵�";
                vlig += "\r\n#L100000000#��׽ý� �̵�";
                vlig += "\r\n#L103000000#Ŀ�׽�Ƽ �̵�";
                vlig += "\r\n#L101000000#�����Ͼ� �̵�";
                vlig += "\r\n#L102000000#�丮�� �̵�";
                vlig += "\r\n#L105000000#�����ǿ�� �̵�"; 
                vlig += "\r\n#L130000000#������ �̵�";
                vlig += "\r\n#L101050000#���췼 �̵�";
                vlig += "\r\n#L140000000#���� �̵�"; 
                vlig += "\r\n#L200000000#������ �̵�";
                vlig += "\r\n#L211000000#������ �̵�"
                vlig += "\r\n#L220000000#���긮�� �̵�";
                vlig += "\r\n#L261000000#������������ �̵�";
                vlig += "\r\n#L222000000#�Ʒ����� �̵�";
                vlig += "\r\n#L240000000#������ �̵�";
                vlig += "\r\n#L260000000#�Ƹ���Ʈ �̵�";
                vlig += "\r\n#L261000000#����Ƽ�� �̵�";
                vlig += "\r\n#L252000000#Ȳ�ݻ�� �̵�";
                vlig += "\r\n#L273000000#Ȳȥ�� �丮��";
                vlig += "\r\n#L301000000#ũ���� ���";
                vlig += "\r\n#L105200000#��Ÿ�� �̵�";
                vlig += "\r\n#L931050810#���׿� �̵�";
                vlig += "\r\n#L310070000#���̺� �̵�";
                cm.sendSimple(vlig);

            } else if (selection == 5) {
                var hunt = "#e[WARP]#n #d���Ͻô� ��#k�� �������ּ���.\r\n";
 var hunt = "#b#h ##k�� ȯ���մϴ�~�� ����͸� �������ּ���.\r\n\r\n"
              
                hunt += "\r\n#L922010900#�������� ���������� ";
                cm.sendSimple(hunt);

            } else if (selection == 6) {
                var boss = "";
                     boss += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/1# #k\#L230040410# �ٴټ� ������ �� �Ǿƴ���\r\n#l"
                      boss += "\r\n #l\n #fUI/UIWindow2.img/MobGage/Mob/8510000# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"   
                    boss += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/2# #k\#L280030100# �ɿ��� ���� ���� ī���� ����\r\n#l"
                      boss += "\r\n #l\n #fUI/UIWindow2.img/MobGage/Mob/8800000# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
               boss += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/3# #k\#L240060200# ���� ���ֶ� �Ҹ��� ī���� ȥ����"
                     boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8810018# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
                 boss += "k\r\n #fUI/UIWindow2.img/NewPyramid/Number/4# #k\#L211070100# ������������ ������ �� ����"
                 boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8840000# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
                 boss += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/5# #k\#L262031300# �ƽ����� ������ �ٽ����� ����"
                boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8870000# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]l\r\n"                  
                boss += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/6# #k\#L272020200# �ð��� Ż������ ��ī�̷�"
                 boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8860000# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
                 boss += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/7# #k\#L271040100# �̷��� ���� �ñ׳ʽ�"
                 boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8850011# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
                boss += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/8# #k\#L401060100# ������ �� �ű׳ʽ�"
                boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8880000# [���̵� :��#e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
                boss += "\r\n#fUI/UIWindow2.img/NewPyramid/Number/9# #k\#L270050100# �̷��� ������ ������ ī���� ��ũ��"                
                boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8820001# [���̵� :��#e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"              
                cm.sendSimple(boss);

                    } else if (selection == 8) {
                var boss = "";
                   boss += "\r\n#fUI/UIWindow2.img/NewPyramid/Number/1# #k\#L105200529# �Ǵٸ� �ð��� �ı��� ī���� �ݹ�"
                   boss += "\r\n #l\n #fUI/UIWindow2.img/MobGage/Mob/8910100# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
                   boss += "\r\n#fUI/UIWindow2.img/NewPyramid/Number/2# #k\#L105200710# �μ��� ���� �� �г� ī���� ���� ��"
                    boss += "\r\n #l\n #fUI/UIWindow2.img/MobGage/Mob/8920100# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
                  boss += "\r\n#fUI/UIWindow2.img/NewPyramid/Number/3# #k\#L105200610# �ĸ��� ���� ī���� �ǿ���"
                 boss += "\r\n #l\n #fUI/UIWindow2.img/MobGage/Mob/8900100# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
               boss += "\r\n#fUI/UIWindow2.img/NewPyramid/Number/4# #k\#L105200810# ������ ������ ī���� ����"                
                boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8930100# [���̵� :��#e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"              
               cm.sendSimple(boss);   

                    } else if (selection == 7) {
               var hunt = "#b#h ##k�� ȯ���մϴ�~�� �ۼַ��� ���� ����� �� �������ּ���.\r\n\r\n"
                hunt += "#r#e[�ۼַ��� ���� �����]\r\n#k#n";
                hunt += "#L271030310#(Lv.173) �� #r���� ���������  #k �� #r�����1#k\r\n"
                hunt += "#L271030400#(Lv.173) �� #r���� ���������  #k �� #r���� �� 4����#k\r\n"
                hunt += "#L273000000#(Lv.190) �� #bȲȥ�� �丮�¡���  #k �� #bȲȥ�� �丮��#k\r\n"
                hunt += "#L273050000#(Lv.197) �� #rȲȥ�� �丮�¡���  #k �� #r���ֹε��� �ǳ�ó#k\r\n"
                hunt += "#L241020205#(Lv.203) �� #bũ��Ƽ�ƽ�����      #k �� #b����ǽ�#k\r\n"
                hunt += "#L241020217#(Lv.205) �� #bũ��Ƽ�ƽ�����      #k �� #b�����ǽ�#k\r\n"
                hunt += "#L241020207#(Lv.205) �� #bũ��Ƽ�ƽ�����      #k �� #b�ۿ��ǽ�#k\r\n"
                hunt += "#L241010227#(Lv.205) �� #bũ��Ƽ�ƽ�����      #k �� #b�����ǽ�#k\r\n"
                hunt += "#L241010226#(Lv.205) �� #bũ��Ƽ�ƽ�����      #k �� #b�����ǽ�#k\r\n"
                hunt += "#L310070110#(Lv.210) �� #b��蹫������         #k �� #b��蹫�� ���1#k\r\n"
                hunt += "#L310070150#(Lv.210) �� #b��蹫������         #k �� #b��蹫�� ����#k\r\n"
                hunt += "#L310070220#(Lv.215) �� #b��ī�̶��Ρ���      #k �� #b �����ڸ�#k\r\n"
                hunt += "#L310070200#(Lv.215) �� #b��ī�̶��Ρ���      #k �� #b �ö󰡴±�#k\r\n"
                //hunt += "#L310070300#(Lv.222) �� #b����� ����       #k �� #b ����� ���� 1#k\r\n"
                  cm.sendSimple(hunt);

         
            }  
            } else if (status == 3) {
 var s = selection;
 if(s >=100000000) {
 cm.dispose();
 cm.warp(s,0);
}

            }	
	   	   
      }
}
    
    