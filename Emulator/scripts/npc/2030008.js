function start()
{
	St = -1;
	action(1, 0, 0);
}

function action(M ,T , S)
{
	if(M != 1)
	{
		if(M == 0 && T == 0 && St == 3)
		{
			switch(S2)
			{
				case 0:
				cm.sendNext("이지 자쿰에게 바칠 제물이 필요하군..");
				break;

				case 1:
				cm.sendNext("자쿰에게 바칠 제물이 필요하군..");
				break;
			}
			M = 1;
			St -= 1;
			return;
		}

		if(M == 0 && T == 0 && St == 4)
		{
			switch(S2)
			{
				case 0:
				cm.sendNextPrev("다만 자쿰을 부르는 데 제물로 필요한 #b#t4001796##k은 내게는 많이 있으니 그냥 주겠네.");
				break;

				case 1:
				cm.sendNextPrev("다만 자쿰을 부르는 데 제물로 필요한 #b#t4001017##k은 지금 내게는 많이 있으니 그냥 주겠네.");
				break;
			}
			M = 1;
			St -= 1;
			return;
		}
		cm.dispose();
		return;
	}

	if(M == 1)
	St++;
	else
	St--;

	if(St == 0)
	{
		cm.sendSimple("뭐... 좋소. 당신들은 충분한 자격이 되어 보이는군. 무엇을 하시겠소?\r\n#b"
			+ "#L0#폐광 동굴을 조사하러 떠난다.#l\r\n"
			+ "#L1#자쿰 던전을 탐사한다.#l\r\n"
			+ "#L2#자쿰에게 바칠 제물을 받는다.#l\r\n"
			+ "#L3#엘나스로 이동한다.#l");
	}

	else if(St == 1)
	{
		S1 = S;
		switch(S1)
		{
			case 2:
			cm.sendSimple("어느 자쿰에게 바칠 제물이 필요하오?\r\n#b"
				+ "#L0#이지 자쿰#l\r\n"
				+ "#L1#노말/카오스 자쿰#l\r\n");
			break;

			case 3:
			cm.sendNext("그럼 엘나스로 보네주겠네");
			break;

			default:
			cm.sendOk("지금은 페광 동굴 조사와 자쿰 던전 탐사를 진행할 수 없게 되었소. 나중에 진행하게 되면 내가 먼저 연락하겠소.");
			cm.dispose();
			break;
		}
	}

	else if(St == 2)
	{
		S2 = S;
		switch(S1)
		{
			case 2:
			switch(S2)
			{
				case 0:
				if(cm.haveItem(4001796))
				{
					cm.sendOk("이미 이지 자쿰의 제물인 #b#t4001796##k을 가지고 있군.. 다 사용하면 다시 말하게.");
					cm.dispose();
					return;
				}
				cm.sendNext("이지 자쿰에게 바칠 제물이 필요하군..");
				break;

				case 1:
				if(cm.haveItem(4001017))
				{
					cm.sendOk("이미 자쿰의 제물인 #b#t4001017##k을 가지고 있군.. 다 사용하면 다시 말하게.");
					cm.dispose();
					return;
				}

				cm.sendNext("자쿰에게 바칠 제물이 필요하군..");
				break;
			}
			break;

			case 3:
			cm.changeMapS(5000000,0x00,0x01);
			cm.dispose();
			break;
		}
	}

	else if(St == 3)
	{
		switch(S1)
		{
			case 2:
			switch(S2)
			{
				case 0:
				cm.sendNextPrev("다만 자쿰을 부르는 데 제물로 필요한 #b#t4001796##k은 내게는 많이 있으니 그냥 주겠네.");
				if(!cm.haveItem(4001796))
				{
					cm.gainItem(4001796, 1);
				}
				break;

				case 1:
				cm.sendNextPrev("다만 자쿰을 부르는 데 제물로 필요한 #b#t4001017##k은 지금 내게는 많이 있으니 그냥 주겠네.");
				if(!cm.haveItem(4001017))
				{
					cm.gainItem(4001017, 1);
				}
				break;
			}
		}
	}

	else if(St == 4)
	{
		switch(S1)
		{
			case 2:
			switch(S2)
			{
				case 0:
				cm.sendNextPrev("이것을 이지 자쿰의 제단에 떨어뜨리면 된다네.");
				break;

				case 1:
				cm.sendNextPrev("이것을 자쿰의 제단에 떨어뜨리면 된다네.");
				break;
			}
		}
	}

	else if(St == 5)
	{
		cm.dispose();
	}
}