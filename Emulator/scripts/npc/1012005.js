var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.openShop (1012122);
        cm.dispose();
        return;
    }
    if (mode == 0) {/*
 *
 * SpiritStyle ��@�� ��@ũ��Ʈ �Դϴ�.
 * NPC : 9090008 - ���
 * Function : ���������� ����
 * Customize : ������ �ɼ� ����
 * @Author : ����(ljw5528)
 * @Modify : �Ͽ�(ifhayo)
 * �ش� ��ũ��Ʈ�� �ּ��� �����ص� ������
 * ������ �� �����ڴ� �������� �����ּ���.
 * 2014 �� SpiritStyle
 *
 */

importPackage(Packages.client.items);
importPackage(Packages.server.items);




function start() {
  cm.sendSimple("ȯ���մϴ� #b#h ##k��ڴ�! �������� �ɼ��� �ٲ�帮�� �ֽ��ϴ�. ���Ͻô� �۾��� �������ּ���.#b\r\n"
    +"#L1#������ �ɼ� �ٲٱ�\r\n"
    +"#L2#������ �߰��ɼ� �����ϱ�\r\n"
    +"#L3#����ɷ� �����ϱ�\r\n"
    +"#L4#����ų� ����ɷ� �����ϱ�\r\n")
}




 var sel;
 var status = -1;




// !����
function action(mode, type, selection) { if(mode == 1) { status++; } else { status--; cm.dispose(); return;}


 if(status == 0) {


  Sort = selection == 1 ? 1 : selection == 2 ? 2 : selection == 3 ? 3 : 4
  Name = selection == 1 ? "������ �ɷ�ġ�� ������" : selection == 2 ? "������ �߰��ɼ��� ������" : "������ ����ɷ��� ������"
  if(cm.getPlayer().getGMLevel()>5) {
  var str = ""+Name+"�÷��� ���� #b#h ##k��ڴ��� �����Ͻ� ������ ��� �� ��� �������� �������ּ���.\r\n";
  for(var i=1;i < 100; i++) {
   if(cm.getEquip(i)){
   str += "#L"+i+"#"; str += "#i"+cm.getEquip(i).getItemId()+"#"; str += " #b#e#z"+cm.getEquip(i).getItemId()+"#"; str += "#n\r\n";
   }
  }
  cm.sendSimple(str);
 } else { cm.sendOk("��ڰ� �ƴ� ����� �̿��Ͻ� �� �����ϴ�. #h #���� �̿����� ����˴ϴ�."); cm.dispose();}
 }


 else if(status==1){


   SelectedItemID = selection;
   ItemNum        = cm.getEquip(SelectedItemID).getItemId()
   ItemInfo       = cm.getEquip(SelectedItemID);
   Origin         = ItemInformation.getInstance().getEquipById(ItemInfo.getItemId());
   ShowItemInfo   = "#e������ : #i"+ItemNum+"# #b#z"+ItemNum+"##k#n\r\n#fn����ü#";
   NormalOption   = "���Ͻô� ���� �Է��ϼ��� #r(�⺻�� : 32768)#k#n";
   AddOption      = "#r(�⺻�� : 101)#k#n";




  switch(Sort) {
   case 1:
   cm.sendGetNumber(""+ShowItemInfo+"\r\nSTR: "+NormalOption+"",0,0,32768);
   break;


   case 2:
   cm.sendGetNumber(""+ShowItemInfo+"\r\n���� ���ݽ� ������ ����: "+AddOption+"",0,0,101);
   break;


   case 3:
   P_17 = "#fUI/UIWindow2/AdditionalOptionTooltip/rare#"
   P_18 = "#fUI/UIWindow2/AdditionalOptionTooltip/epic#"
   P_19 = "#fUI/UIWindow2/AdditionalOptionTooltip/unique#"
   P_20 = "#fUI/UIWindow2/AdditionalOptionTooltip/legendary#"


   cm.sendSimple(""+ShowItemInfo+"\r\n������ �������� ���� ����� �������ּ���.\r\n"
     +"#L17#"+P_17+"#b����\r\n"
     +"#L18#"+P_18+"#d����\r\n"
     +"#L19#"+P_19+"#Cyellow#����ũ\r\n"
     +"#L20#"+P_20+"#g�����帮");
   break;
  }


 } else if (status == 2) {


  switch(Sort) {
   case 1:
   cStr = selection == 32768 ? Origin.getStr() : selection;
   cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
     + "STR: +"+cStr+"\r\n"
     + "#kDEX: +"+NormalOption+"",0,0,32768);
   break;


   case 2:
   cBossDamage = selection == 101 ? Origin.getBossDamage() : selection;
   cm.sendGetNumber(""+ShowItemInfo+"\r\n#g#e"
     + "���� ���ݽ� ������: +"+cBossDamage+"%\r\n"
     + "#k#n���� ���� ����: "+AddOption+"",0,0,101);
   break;


   case 3:
   cState = selection
   ShowState = cState == 17 ? "#b����" : cState == 18 ? "#d����" : cState == 19 ? "#Cyellow#����ũ" : "#g�����帮"
   PictureiF = cState == 17 ? "#fUI/UIWindow2/AdditionalOptionTooltip/rare#" :
     cState == 18 ? "#fUI/UIWindow2/AdditionalOptionTooltip/epic#" :
     cState == 19 ? "#fUI/UIWindow2/AdditionalOptionTooltip/unique#" : "#fUI/UIWindow2/AdditionalOptionTooltip/legendary#"


   cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
     + "������ : "+PictureiF+""+ShowState+"#k\r\n"
     + "#kù ��° ����ɷ��� �Է����ּ���.",0,0,42556);
   break;
  }




 } else if (status == 3) {


  switch(Sort) {
   case 1:
   cDex = selection == 32768 ? Origin.getDex() : selection;
   cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
     + "STR: +"+cStr+"\r\n"
     + "DEX: +"+cDex+"\r\n"
     + "#kINT: "+NormalOption+"",0,0,32768);
   break;


   case 2:
   cIgnoreWdef = selection == 101 ? Origin.getIgnoreWdef() : selection;
   cm.sendGetNumber(""+ShowItemInfo+"\r\n#g#e"
     + "���� ���ݽ� ������: +"+cBossDamage+"%\r\n"
     + "���� ���� ����: +"+cIgnoreWdef+"%\r\n"
     + "#k#n�� ������: "+AddOption+"",0,0,101);
   break;


   case 3:
   cPotential1 = selection;
   setPotential(cPotential1);
   nPotential1 = PotentialName
   cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
     + "������ : "+PictureiF+""+ShowState+"#Cgray#\r\n"
     + "ù ��° ����ɷ� : "+nPotential1+"\r\n"
     + "#k�� ��° ����ɷ��� �Է����ּ���.", 0,0,60002);
   break;
  }   


 } else if (status == 4) {


  switch(Sort) {
   case 1:
   cInt = selection == 32768 ? Origin.getInt() : selection;
   cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
     + "STR: +"+cStr+"\r\n"
     + "DEX: +"+cDex+"\r\n"
     + "INT: +"+cInt+"\r\n"
     + "#kLUK: "+NormalOption+"",0,0,32768);
   break;


   case 2:
   cAllDamageP = selection == 101 ? Origin.getAllDamageP() : selection;
   cm.sendGetNumber(""+ShowItemInfo+"\r\n#g#e"
     + "���� ���ݽ� ������: +"+cBossDamage+"%\r\n"
     + "���� ���� ����: +"+cIgnoreWdef+"%\r\n"
     + "�� ������: +"+cAllDamageP+"%\r\n"
     + "#k#n�ý���: "+AddOption+"",0,0,101);
   break;


   case 3:
   cPotential2 = selection;
   setPotential(cPotential2);
   nPotential2 = PotentialName
   cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
     + "������ : "+PictureiF+""+ShowState+"#Cgray#\r\n"
     + "ù ��° ����ɷ� : "+nPotential1+"\r\n"
     + "�� ��° ����ɷ� : "+nPotential2+"\r\n"
     + "#k�� ��° ����ɷ��� �Է����ּ���.", 0,0,60002);
   break;
  }   




 } else if (status == 5) {
  switch(Sort) {
   case 1:
   cLuk = selection == 32768 ? Origin.getInt() : selection;
   cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
     + "STR: +"+cStr+"\r\n"
     + "DEX: +"+cDex+"\r\n"
     + "INT: +"+cInt+"\r\n"
     + "LUK: +"+cLuk+"\r\n"
     + "#kMaxHP  : "+NormalOption+"",0,0,32768);
   break;


   case 2:
   cAllStatP = selection == 101 ? Origin.getAllStatP() : selection;
   cm.sendGetNumber(""+ShowItemInfo+"\r\n#g#e"
     + "���� ���ݽ� ������: +"+cBossDamage+"%\r\n"
     + "���� ���� ����: +"+cIgnoreWdef+"%\r\n"
     + "�� ������: +"+cAllDamageP+"%\r\n"
     + "�ý���: +"+cAllStatP+"%\r\n"
     + "#k#n���� ���� ����: "+AddOption+"",0,0,101);
   break;


   case 3:
   cPotential3 = selection;
   setPotential(cPotential3);
   nPotential3 = PotentialName
   cm.sendYesNo(""+ShowItemInfo+"\r\n#Cgray#"
     + "������ : "+PictureiF+""+ShowState+"#Cgray#\r\n"
     + "ù ��° ����ɷ� : "+nPotential1+"\r\n"
     + "�� ��° ����ɷ� : "+nPotential2+"\r\n"
     + "�� ��° ����ɷ� : "+nPotential3+"\r\n"
     + "\r\n\r\n#e#r�� �������� ������ ����ðڽ��ϱ�?");
   break;
  }   


   
 } else if (status == 6) {
  switch(Sort) {
   case 1:
   cMaxHp = selection == 32768 ? Origin.getHp() : selection;
   cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
     + "STR: +"+cStr+"\r\n"
     + "DEX: +"+cDex+"\r\n"
     + "INT: +"+cInt+"\r\n"
     + "LUK: +"+cLuk+"\r\n"
     + "MaxHP: +"+cMaxHp+"\r\n"
     + "#kMaxMP: "+NormalOption+"",0,0,32768);
   break;


   case 2:
   cDownLevel = selection == 101 ? Origin.getDownLevel() : selection;
   cm.sendYesNo(""+ShowItemInfo+"\r\n#g#e"
     + "���� ���ݽ� ������: +"+cBossDamage+"%\r\n"
     + "���� ���� ����: +"+cIgnoreWdef+"%\r\n"
     + "�� ������: +"+cAllDamageP+"%\r\n"
     + "�ý���: +"+cAllStatP+"%\r\n"
     + "���� ���� ����: -"+cDownLevel+"\r\n"
     + "\r\n\r\n#e#r�� �������� ������ ����ðڽ��ϱ�?");
   break;


   case 3:
   ItemInfo.setState(cState);
   ItemInfo.setPotential1(cPotential1);
   ItemInfo.setPotential2(cPotential2);
   ItemInfo.setPotential3(cPotential3);
   cm.getChar().saveToDB(false,false);
   cm.fakeRelog();
   cm.updateChar();
   cm.dispose();
   break;
  }   




 } else if (status == 7) {


  switch(Sort) {
   case 1:
   cMaxMp = selection == 32768 ? Origin.getMp() : selection;
   cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
     + "STR: +"+cStr+"\r\n"
     + "DEX: +"+cDex+"\r\n"
     + "INT: +"+cInt+"\r\n"
     + "LUK: +"+cLuk+"\r\n"
     + "MaxHP: +"+cMaxHp+"\r\n"
     + "MaxMP: +"+cMaxMp+"\r\n"
     + "#k���ݷ�: "+NormalOption+"",0,0,32768);
   break;


   case 2:
   ItemInfo.setBossDamage(cBossDamage);
   ItemInfo.setIgnoreWdef(cIgnoreWdef);
   ItemInfo.setAllDamageP(cAllDamageP);
   ItemInfo.setAllStatP(cAllStatP);
   ItemInfo.setDownLevel(cDownLevel);
   cm.getChar().saveToDB(false,false);
   cm.fakeRelog();
   cm.updateChar();
   cm.dispose();
   break;


   case 3:
   break;
  }


 } else if (status == 8) {
  cWatk = selection == 32768 ? Origin.getWatk() : selection;
  cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
   + "STR: +"+cStr+"\r\n"
   + "DEX: +"+cDex+"\r\n"
   + "INT: +"+cInt+"\r\n"
   + "LUK: +"+cLuk+"\r\n"
   + "MaxHP: +"+cMaxHp+"\r\n"
   + "MaxMP: +"+cMaxMp+"\r\n"
   + "���ݷ�: +"+cWatk+"\r\n"
   + "#k����: "+NormalOption+"",0,0,32768);


 } else if (status == 9) {
  cMatk = selection == 32768 ? Origin.getMatk() : selection;
  cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
   + "STR: +"+cStr+"\r\n"
   + "DEX: +"+cDex+"\r\n"
   + "INT: +"+cInt+"\r\n"
   + "LUK: +"+cLuk+"\r\n"
   + "MaxHP: +"+cMaxHp+"\r\n"
   + "MaxMP: +"+cMaxMp+"\r\n"
   + "���ݷ�: +"+cWatk+"\r\n"
   + "����: +"+cMatk+"\r\n"
   + "#k��������: "+NormalOption+"",0,0,32768);


 } else if (status == 10) {
  cWdef = selection == 32768 ? Origin.getWdef() : selection;
  cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
   + "STR: +"+cStr+"\r\n"
   + "DEX: +"+cDex+"\r\n"
   + "INT: +"+cInt+"\r\n"
   + "LUK: +"+cLuk+"\r\n"
   + "MaxHP: +"+cMaxHp+"\r\n"
   + "MaxMP: +"+cMaxMp+"\r\n"
   + "���ݷ�: +"+cWatk+"\r\n"
   + "����: "+cMatk+"\r\n"
   + "��������: +"+cWdef+"\r\n"
   + "#k��������: +"+NormalOption+"",0,0,32768);


 } else if (status == 11) {
  cMdef = selection == 32768 ? Origin.getMdef() : selection;
  cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
   + "STR: +"+cStr+"\r\n"
   + "DEX: +"+cDex+"\r\n"
   + "INT: +"+cInt+"\r\n"
   + "LUK: +"+cLuk+"\r\n"
   + "MaxHP: +"+cMaxHp+"\r\n"
   + "MaxMP: +"+cMaxMp+"\r\n"
   + "���ݷ�: +"+cWatk+"\r\n"
   + "����: +"+cMatk+"\r\n"
   + "��������: +"+cWdef+"\r\n"
   + "��������: +"+cMdef+"\r\n"
   + "#k����ġ: "+NormalOption+"",0,0,32768);


 } else if (status == 12) {
  cAcc = selection == 32768 ? Origin.getAcc() : selection;
  cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
   + "STR: +"+cStr+"\r\n"
   + "DEX: +"+cDex+"\r\n"
   + "INT: +"+cInt+"\r\n"
   + "LUK: +"+cLuk+"\r\n"
   + "MaxHP: +"+cMaxHp+"\r\n"
   + "MaxMP: +"+cMaxMp+"\r\n"
   + "���ݷ�: +"+cWatk+"\r\n"
   + "����: +"+cMatk+"\r\n"
   + "��������: +"+cWdef+"\r\n"
   + "��������: +"+cMdef+"\r\n"
   + "����ġ: +"+cAcc+"\r\n"
   + "#kȸ��ġ: "+NormalOption+"",0,0,32768);


 } else if (status == 13) {
  cAvoid = selection == 32768 ? Origin.getAvoid() : selection;
  cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
   + "STR: +"+cStr+"\r\n"
   + "DEX: +"+cDex+"\r\n"
   + "INT: +"+cInt+"\r\n"
   + "LUK: +"+cLuk+"\r\n"
   + "MaxHP: +"+cMaxHp+"\r\n"
   + "MaxMP: +"+cMaxMp+"\r\n"
   + "���ݷ�: +"+cWatk+"\r\n"
   + "����: +"+cMatk+"\r\n"
   + "��������: +"+cWdef+"\r\n"
   + "��������: +"+cMdef+"\r\n"
   + "����ġ: +"+cAcc+"\r\n"
   + "ȸ��ġ: +"+cAvoid+"\r\n"
   + "#k�̵��ӵ�: "+NormalOption+"",0,0,32768);


 } else if (status == 14) {
  cSpeed = selection == 32768 ? Origin.getSpeed() : selection;
  cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
   + "STR: +"+cStr+"\r\n"
   + "DEX: +"+cDex+"\r\n"
   + "INT: +"+cInt+"\r\n"
   + "LUK: +"+cLuk+"\r\n"
   + "MaxHP: +"+cMaxHp+"\r\n"
   + "MaxMP: +"+cMaxMp+"\r\n"
   + "���ݷ�: +"+cWatk+"\r\n"
   + "����: +"+cMatk+"\r\n"
   + "��������: +"+cWdef+"\r\n"
   + "��������: +"+cMdef+"\r\n"
   + "����ġ: +"+cAcc+"\r\n"
   + "ȸ��ġ: +"+cAvoid+"\r\n"
   + "�̵��ӵ�: +"+cSpeed+"\r\n"
   + "#k������: "+NormalOption+"",0,0,32768);


 } else if (status == 15) {
  cJump = selection == 32768 ? Origin.getJump() : selection;
  cm.sendGetNumber(""+ShowItemInfo+"\r\n#Cgray#"
   + "STR: +"+cStr+"\r\n"
   + "DEX: +"+cDex+"\r\n"
   + "INT: +"+cInt+"\r\n"
   + "LUK: +"+cLuk+"\r\n"
   + "MaxHP: +"+cMaxHp+"\r\n"
   + "MaxMP: +"+cMaxMp+"\r\n"
   + "���ݷ�: +"+cWatk+"\r\n"
   + "����: +"+cMatk+"\r\n"
   + "��������: +"+cWdef+"\r\n"
   + "��������: +"+cMdef+"\r\n"
   + "����ġ: +"+cAcc+"\r\n"
   + "ȸ��ġ: +"+cAvoid+"\r\n"
   + "�̵��ӵ�: +"+cSpeed+"\r\n"
   + "������: "+cJump+"\r\n"
   + "#k���׷��̵� ���� Ƚ��: #r(�⺻�� : 126)#k#n",0,1,126);


 } else if (status == 16) {
  cUpgradeSlots = selection == 126 ? Origin.getUpgradeSlots() : selection;
  cm.sendYesNo(""+ShowItemInfo+"\r\n#Cgray#"
   + "STR: +"+cStr+"\r\n"
   + "DEX: +"+cDex+"\r\n"
   + "INT: +"+cInt+"\r\n"
   + "LUK: +"+cLuk+"\r\n"
   + "MaxHP: +"+cMaxHp+"\r\n"
   + "MaxMP: +"+cMaxMp+"\r\n"
   + "���ݷ�: +"+cWatk+"\r\n"
   + "����: +"+cMatk+"\r\n"
   + "��������: +"+cWdef+"\r\n"
   + "��������: +"+cMdef+"\r\n"
   + "����ġ: +"+cAcc+"\r\n"
   + "ȸ��ġ: +"+cAvoid+"\r\n"
   + "�̵��ӵ�: +"+cSpeed+"\r\n"
   + "������: "+cSpeed+"\r\n"
   + "���׷��̵� ���� Ƚ��: "+cUpgradeSlots+"\r\n"
   + "\r\n\r\n#e#r�� �������� ������ ����ðڽ��ϱ�?");


 } else if (status == 17) {
  ItemInfo.setStr(cStr);
  ItemInfo.setDex(cDex);
  ItemInfo.setInt(cInt);
  ItemInfo.setLuk(cLuk);
  ItemInfo.setHp(cMaxHp);
  ItemInfo.setMp(cMaxMp);
  ItemInfo.setWatk(cWatk);
  ItemInfo.setMatk(cMatk);
  ItemInfo.setWdef(cWdef);
  ItemInfo.setMdef(cMdef);
  ItemInfo.setAcc(cAcc);
  ItemInfo.setAvoid(cAvoid);
  ItemInfo.setSpeed(cSpeed);
  ItemInfo.setJump(cJump);
  ItemInfo.setUpgradeSlots(cUpgradeSlots);
  cm.getChar().saveToDB(false,false);
  cm.fakeRelog();
  cm.updateChar();
  cm.dispose();


 }
}


function setPotential(selection) {
 LV = Origin.getItemLevel();


 if(LV > 0) {
 PotentialName =
 selection == 10041 ? "�� 1%" :
 selection == 20041 ? "�� 2%" :
 selection == 30041 ? "�� 3%" :
 selection == 40041 ? "�� 6%" :
 selection == 10042 ? "���� 1%" :
 selection == 20042 ? "���� 2%" :
 selection == 30042 ? "���� 3%" :
 selection == 40042 ? "���� 6%" :
 selection == 10043 ? "��Ʈ 1%" :
 selection == 20043 ? "��Ʈ 2%" :
 selection == 30043 ? "��Ʈ 3%" :
 selection == 40043 ? "��Ʈ 6%" :
 selection == 10044 ? "�� 1%" :
 selection == 20044 ? "�� 2%" :
 selection == 30044 ? "�� 3%" :
 selection == 40044 ? "�� 6%" :
 selection == 20086 ? "�ý��� 1%" :
 selection == 30086 ? "�ý��� 2%" :
 selection == 40086 ? "�ý��� 3%" : 
 selection == 10045 ? "MaxHp 1%" :
 selection == 20045 ? "MaxHp 2%" :
 selection == 30045 ? "MaxHp 3%" :
 selection == 40045 ? "MaxHp 6%" :
 selection == 10046 ? "MaxMp 1%" :
 selection == 20046 ? "MaxMp 2%" :
 selection == 30046 ? "MaxMp 3%" :
 selection == 40046 ? "MaxMp 6%" :
 selection == 10047 ? "����ġ 1%" :
 selection == 20047 ? "����ġ 2%" :
 selection == 30047 ? "����ġ 3%" :
 selection == 40047 ? "����ġ 6%" :
 selection == 10048 ? "ȸ��ġ 1%" :
 selection == 20048 ? "ȸ��ġ 2%" :
 selection == 30048 ? "ȸ��ġ 3%" :
 selection == 40048 ? "ȸ��ġ 6%" :
 selection == 10051 ? "���ݷ� 1%" :
 selection == 20051 ? "���ݷ� 2%" :
 selection == 30051 ? "���ݷ� 3%" :
 selection == 40051 ? "���ݷ� 6%" :
 selection == 10052 ? "���� 1%" :
 selection == 20052 ? "���� 2%" :
 selection == 30052 ? "���� 3%" :
 selection == 40052 ? "���� 6%" :
 selection == 10070 ? "�� ������ 1%" :
 selection == 20070 ? "�� ������ 2%" :
 selection == 30070 ? "�� ������ 3%" :
 selection == 40070 ? "�� ������ 6%" :
 selection == 10053 ? "�������� 1%" :
 selection == 20053 ? "�������� 2%" :
 selection == 30053 ? "�������� 3%" :
 selection == 40053 ? "�������� 6%" :
 selection == 10054 ? "�������� 1%" :
 selection == 20054 ? "�������� 2%" :
 selection == 30054 ? "�������� 3%" :
 selection == 40054 ? "�������� 6%" :
 selection == 40650 ? "�޼� ȹ�淮 10%" :
 selection == 40656 ? "������ ȹ��Ȯ�� 10%" :
 selection == 10055 ? "ũ��Ƽ�� Ȯ�� 1%" :
 selection == 20055 ? "ũ��Ƽ�� Ȯ�� 2%" :
 selection == 30055 ? "ũ��Ƽ�� Ȯ�� 3%" :
 selection == 40055 ? "ũ��Ƽ�� Ȯ�� 6%" :
 selection == 40056 ? "ũ��Ƽ�� �ּ� ������ 3%" :
 selection == 40057 ? "ũ��Ƽ�� �ִ� ������ 3%" : 
 selection == 40501 ? "��� ��ų�� MP �Ҹ� -5%" :
 selection == 40502 ? "��� ��ų�� MP �Ҹ� -10%" :
 selection == 60001 ? "�� ������ 20%" :
 selection == 40081 ? "�ý��� +12" :
 selection == 30106 ? "��� ��ų���� +1" :
 selection == 40106 ? "��� ��ų���� +2" :
 selection == 40107 ? "��� ��ų���� +3" :
 selection == 40111 ? "��� �Ӽ� ���� 10%" :
 selection == 40116 ? "���� �̻� ���� 10%" :
 selection == 30291 ? "���� �� ������ ����� ���� 30%" : 
 selection == 40291 ? "���� �� ������ ����� ���� 35%" :
 selection == 40292 ? "���� �� ������ ����� ���� 40%" :
 selection == 30356 ? "�ǰ� �� 5% Ȯ���� ������ 20% ����" :
 selection == 40356 ? "�ǰ� �� 10% Ȯ���� ������ 20% ����" :
 selection == 40357 ? "�ǰ� �� 5% Ȯ���� ������ 40% ����" :
 selection == 20366 ? "�ǰ� �� �����ð� 1��" :
 selection == 30366 ? "�ǰ� �� �����ð� 2��" :
 selection == 40366 ? "�ǰ� �� �����ð� 3��" : 
 selection == 40556 ? "��� ��ų�� ���� ���ð� -1��" :
 selection == 40557 ? "��� ��ų�� ���� ���ð� -2��" :
 selection == 42556 ? "��� ��ų�� ���� ���ð� -1��" : ""
 return LV;




 }
 
 if (LV > 24) {
 PotentialName = 
 selection == 40056 ? "ũ��Ƽ�� �ּ� ������ 6%" :
 selection == 40057 ? "ũ��Ƽ�� �ִ� ������ 6%" : ""
 return LV;






 }


 if (LV > 44) {
 PotentialName =
 selection == 10041 ? "�� 2%" :
 selection == 20041 ? "�� 4%" :
 selection == 30041 ? "�� 6%" :
 selection == 40041 ? "�� 9%" :
 selection == 10042 ? "���� 2%" :
 selection == 20042 ? "���� 4%" :
 selection == 30042 ? "���� 6%" :
 selection == 40042 ? "���� 9%" :
 selection == 10043 ? "��Ʈ 2%" :
 selection == 20043 ? "��Ʈ 4%" :
 selection == 30043 ? "��Ʈ 6%" :
 selection == 40043 ? "��Ʈ 9%" :
 selection == 10044 ? "�� 2%" :
 selection == 20044 ? "�� 4%" :
 selection == 30044 ? "�� 6%" :
 selection == 40044 ? "�� 9%" :
 selection == 20086 ? "�ý��� 2%" :
 selection == 30086 ? "�ý��� 4%" :
 selection == 40086 ? "�ý��� 6%" : 
 selection == 10045 ? "MaxHp 2%" :
 selection == 20045 ? "MaxHp 4%" :
 selection == 30045 ? "MaxHp 6%" :
 selection == 40045 ? "MaxHp 9%" :
 selection == 10046 ? "MaxMp 2%" :
 selection == 20046 ? "MaxMp 4%" :
 selection == 30046 ? "MaxMp 6%" :
 selection == 40046 ? "MaxMp 9%" :
 selection == 10047 ? "����ġ 2%" :
 selection == 20047 ? "����ġ 4%" :
 selection == 30047 ? "����ġ 6%" :
 selection == 40047 ? "����ġ 9%" :
 selection == 10048 ? "ȸ��ġ 2%" :
 selection == 20048 ? "ȸ��ġ 4%" :
 selection == 30048 ? "ȸ��ġ 6%" :
 selection == 40048 ? "ȸ��ġ 9%" :
 selection == 10051 ? "���ݷ� 2%" :
 selection == 20051 ? "���ݷ� 4%" :
 selection == 30051 ? "���ݷ� 6%" :
 selection == 40051 ? "���ݷ� 9%" :
 selection == 10052 ? "���� 2%" :
 selection == 20052 ? "���� 4%" :
 selection == 30052 ? "���� 6%" :
 selection == 40052 ? "���� 9%" :
 selection == 10070 ? "�� ������ 2%" :
 selection == 20070 ? "�� ������ 4%" :
 selection == 30070 ? "�� ������ 6%" :
 selection == 40070 ? "�� ������ 9%" :
 selection == 10053 ? "�������� 2%" :
 selection == 20053 ? "�������� 4%" :
 selection == 30053 ? "�������� 6%" :
 selection == 40053 ? "�������� 9%" :
 selection == 10054 ? "�������� 2%" :
 selection == 20054 ? "�������� 4%" :
 selection == 30054 ? "�������� 6%" :
 selection == 40054 ? "�������� 9%" :
 selection == 40650 ? "�޼� ȹ�淮 15%" :
 selection == 40656 ? "������ ȹ��Ȯ�� 15%" :
 selection == 10055 ? "ũ��Ƽ�� Ȯ�� 2%" :
 selection == 20055 ? "ũ��Ƽ�� Ȯ�� 4%" :
 selection == 30055 ? "ũ��Ƽ�� Ȯ�� 6%" :
 selection == 40055 ? "ũ��Ƽ�� Ȯ�� 9%" : ""
 selection == 40056 ? "ũ��Ƽ�� �ּ� ������ 9%" :
 selection == 40057 ? "ũ��Ƽ�� �ִ� ������ 9%" : ""
 return LV;
 }


 if (LV > 54) {
 PotentailName =
 selection == 40501 ? "��� ��ų�� MP �Ҹ� -10%" :
 selection == 40502 ? "��� ��ų�� MP �Ҹ� -20%" : ""
 return LV;


 }


 if (LV > 64) {
 PotentailName =
 selection == 40056 ? "ũ��Ƽ�� �ּ� ������ 12%" :
 selection == 40057 ? "ũ��Ƽ�� �ִ� ������ 12%" : ""
 return LV;


 }
 if (LV > 75) {
 PotentialName =
 selection == 10041 ? "�� 3%" :
 selection == 20041 ? "�� 6%" :
 selection == 30041 ? "�� 9%" :
 selection == 40041 ? "�� 12%":
 selection == 10042 ? "���� 3%":
 selection == 20042 ? "���� 6%":
 selection == 30042 ? "���� 9%":
 selection == 40042 ? "���� 12%":
 selection == 10043 ? "��Ʈ 3%":
 selection == 20043 ? "��Ʈ 6%":
 selection == 30043 ? "��Ʈ 9%":
 selection == 40043 ? "��Ʈ 12%":
 selection == 10044 ? "�� 3%":
 selection == 20044 ? "�� 6%":
 selection == 30044 ? "�� 9%":
 selection == 40044 ? "�� 12%":
 selection == 20086 ? "�ý��� 3%":
 selection == 30086 ? "�ý��� 6%":
 selection == 40086 ? "�ý��� 9%": 
 selection == 10045 ? "MaxHp 3%":
 selection == 20045 ? "MaxHp 6%":
 selection == 30045 ? "MaxHp 9%":
 selection == 40045 ? "MaxHp 12%":
 selection == 10046 ? "MaxMp 3%":
 selection == 20046 ? "MaxMp 6%":
 selection == 30046 ? "MaxMp 9%":
 selection == 40046 ? "MaxMp 12%":
 selection == 10047 ? "����ġ 3%":
 selection == 20047 ? "����ġ 6%":
 selection == 30047 ? "����ġ 9%":
 selection == 40047 ? "����ġ 12%":
 selection == 10048 ? "ȸ��ġ 3%":
 selection == 20048 ? "ȸ��ġ 6%":
 selection == 30048 ? "ȸ��ġ 9%":
 selection == 40048 ? "ȸ��ġ 12%":
 selection == 10051 ? "���ݷ� 3%":
 selection == 20051 ? "���ݷ� 6%":
 selection == 30051 ? "���ݷ� 9%":
 selection == 40051 ? "���ݷ� 12%":
 selection == 10052 ? "���� 3%":
 selection == 20052 ? "���� 6%":
 selection == 30052 ? "���� 9%":
 selection == 40052 ? "���� 12%":
 selection == 10070 ? "�� ������ 3%":
 selection == 20070 ? "�� ������ 6%":
 selection == 30070 ? "�� ������ 9%":
 selection == 40070 ? "�� ������ 12%":
 selection == 10053 ? "�������� 3%":
 selection == 20053 ? "�������� 6%":
 selection == 30053 ? "�������� 9%":
 selection == 40053 ? "�������� 12%":
 selection == 10054 ? "�������� 3%":
 selection == 20054 ? "�������� 6%":
 selection == 30054 ? "�������� 9%":
 selection == 40054 ? "�������� 12%":
 selection == 40650 ? "�޼� ȹ�淮 20%":
 selection == 40656 ? "������ ȹ��Ȯ�� 20%":
 selection == 10055 ? "ũ��Ƽ�� Ȯ�� 3%":
 selection == 20055 ? "ũ��Ƽ�� Ȯ�� 6%":
 selection == 30055 ? "ũ��Ƽ�� Ȯ�� 9%":
 selection == 40055 ? "ũ��Ƽ�� Ȯ�� 12%": ""
 return LV;
 }


 if (LV > 84) {
 PotentailName =
 selection == 40056 ? "ũ��Ƽ�� �ּ� ������ 15%" :
 selection == 40057 ? "ũ��Ƽ�� �ִ� ������ 15%" : ""
 return LV;






 } else {
 return;
 }


}



        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        cm.openShop (1012122);

        cm.dispose();
        return;
    }
}
