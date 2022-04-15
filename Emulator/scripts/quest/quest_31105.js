importPackage(Packages.server.quest);

function start()
{
	St = -1; 
	action(1, 0, 0);
}

function action(M, T, S)
{
	if(M != 1)
	{
		if(St != 0)
		{
			St--;
			return;
		}
		cm.dispose();
		return;
	}
	else
	{
		St++;
	}

	if(St == 0)
	{
		cm.sendNext("그런데, 너는 대체 어디서 온거지? 시그너스의 공격 이후 다른 지역과의 연락이 끊겼어.");
	}
	else if(St == 1)
	{
		cm.sendNextPrevS("(과거에서 왔다는 걸 밝히면 안되는데…)아 그게 나는 정신을 잃었더니 이 곳이었어. 내가 어떻게 여기 있게 된 건지 기억이 안나. 지금 상화이 어떤지 설명 좀 해줄래?", 2);
	}
	else if(St == 2)
	{
		cm.sendNextPrev("전쟁의 충경 때문에 순간적 기억 상실이 된건가… 시그너스가 검은 마법사의 마수에 걸려 타락해버렸어. 기사단 전체가 우리의 적이 되었지. 그들은 우리를 공격했고, 보다시피 우리 마을은… 그 공격으로 아버지가 돌아가시게 되었다… 아픈 기억이니 더 이상 묻지마. 자세한 것은 헬레나님께 여쭤봐.");
	}
	else if(St == 3)
	{
		cm.sendNextPrevS("아, 그래 알았어.", 2);
	}
	else
	{
		cm.forceStartQuest(31105);
		cm.dispose();
 	}
}