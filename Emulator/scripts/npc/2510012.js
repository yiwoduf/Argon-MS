importPackage(Packages.client.skills);
function start()
{
	St = -1;
	action(1, 0, 0);
}

function action(M, T, S)
{
	if(M != 1)
	{
		cm.dispose();
		return;
	}

	if(M == 1)
	St++;
	else
	St--;

	if(St == 0)
	{
		selStr = "어둠의 힘이 담겨있는 크리스탈로 당신의 하이퍼 스탯을 증가 시켜드리겠습니다.\r\n";
		for(i = 80000400; i < 80000417; i++)
		{
			selStr += "#L"+ i + "##b#e#q" + i + "##k#n (" + cm.getPlayer().getSkillLevel(i) + " / #r"+SkillFactory.getSkill(i).getMaxLevel()+"#k)\r\n";
		}
		cm.sendSimple(selStr);
	}

	else if(St == 1)
	{
		itemCrs = 4310129;
		needCrs = [1, 2, 4, 8, 10, 15, 20, 25, 30, 35];
		selType = S;

		cm.sendSimple("　- 선택한 하이퍼 스탯 : #e#r#q"+selType+"##k#n\r\n"
			    + "　- 활성된 하이퍼 스탯 : #e#r"+cm.getPlayer().getSkillLevel(selType)+"#k#n (최대 "+SkillFactory.getSkill(selType).getMaxLevel()+" 스탯)\r\n"
			    + "　- 활성시 필요한 비용 : #t"+itemCrs+"# "+needCrs[cm.getPlayer().getSkillLevel(selType)]+"개\r\n\r\n"
			    + "　계속해서 진행할 작업을 선택하세요. 아무것도 원하지 않으면 ESC를 눌러 하이퍼 스탯 분배를 종료합니다.\r\n"
			    + "#L1##b선택한 하이퍼스탯 올리기#l\r\n"
			    + "#L2##e#r이 하이퍼 스탯 초기화하기 (10,000,000 메소 필요)#l\r\n");
	}

	else if(St == 2)
	{
            if (S == 1) {
		if(!checkMaster(selType))
		{
			cm.sendOk("선택한 스탯에는 #e#r더 이상 투자할 수 없습니다.#k#n 이 스탯은 #e#r최대 "+SkillFactory.getSkill(selType).getMaxLevel()+"까지 투자#k#n할 수 있습니다.");
			cm.dispose();
			return;
		}
		if(!cm.haveItem(itemCrs, needCrs[cm.getPlayer().getSkillLevel(selType)]))
		{
			cm.sendOk("#t"+itemCrs+"#이 #e#r부족합니다.#k#n 이 스탯에 투자하려면 적어도 #e#r#t"+itemCrs+"# "+needCrs[cm.getPlayer().getSkillLevel(selType)]+"개가 필요#k#n합니다.");
			cm.dispose();
			return;
		}
                cm.gainItem(itemCrs, -needCrs[cm.getPlayer().getSkillLevel(selType)]);
		cm.teachSkill(selType, cm.getPlayer().getSkillLevel(selType) + 1, SkillFactory.getSkill(selType).getMaxLevel());
		cm.dispose();
		cm.openNpc(2510012);
		return;
            } else if (S == 2) {
                cm.sendOk("준비중입니다.");
                cm.dispose();
            }
	}
}

function checkMaster(i)
{
	if(cm.getPlayer().getSkillLevel(i) == SkillFactory.getSkill(i).getMaxLevel())
	{
		return false;
	}
	return true;
}
