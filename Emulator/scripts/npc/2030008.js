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
				cm.sendNext("���� ���񿡰� ��ĥ ������ �ʿ��ϱ�..");
				break;

				case 1:
				cm.sendNext("���񿡰� ��ĥ ������ �ʿ��ϱ�..");
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
				cm.sendNextPrev("�ٸ� ������ �θ��� �� ������ �ʿ��� #b#t4001796##k�� ���Դ� ���� ������ �׳� �ְڳ�.");
				break;

				case 1:
				cm.sendNextPrev("�ٸ� ������ �θ��� �� ������ �ʿ��� #b#t4001017##k�� ���� ���Դ� ���� ������ �׳� �ְڳ�.");
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
		cm.sendSimple("��... ����. ��ŵ��� ����� �ڰ��� �Ǿ� ���̴±�. ������ �Ͻðڼ�?\r\n#b"
			+ "#L0#�� ������ �����Ϸ� ������.#l\r\n"
			+ "#L1#���� ������ Ž���Ѵ�.#l\r\n"
			+ "#L2#���񿡰� ��ĥ ������ �޴´�.#l\r\n"
			+ "#L3#�������� �̵��Ѵ�.#l");
	}

	else if(St == 1)
	{
		S1 = S;
		switch(S1)
		{
			case 2:
			cm.sendSimple("��� ���񿡰� ��ĥ ������ �ʿ��Ͽ�?\r\n#b"
				+ "#L0#���� ����#l\r\n"
				+ "#L1#�븻/ī���� ����#l\r\n");
			break;

			case 3:
			cm.sendNext("�׷� �������� �����ְڳ�");
			break;

			default:
			cm.sendOk("������ �䱤 ���� ����� ���� ���� Ž�縦 ������ �� ���� �Ǿ���. ���߿� �����ϰ� �Ǹ� ���� ���� �����ϰڼ�.");
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
					cm.sendOk("�̹� ���� ������ ������ #b#t4001796##k�� ������ �ֱ�.. �� ����ϸ� �ٽ� ���ϰ�.");
					cm.dispose();
					return;
				}
				cm.sendNext("���� ���񿡰� ��ĥ ������ �ʿ��ϱ�..");
				break;

				case 1:
				if(cm.haveItem(4001017))
				{
					cm.sendOk("�̹� ������ ������ #b#t4001017##k�� ������ �ֱ�.. �� ����ϸ� �ٽ� ���ϰ�.");
					cm.dispose();
					return;
				}

				cm.sendNext("���񿡰� ��ĥ ������ �ʿ��ϱ�..");
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
				cm.sendNextPrev("�ٸ� ������ �θ��� �� ������ �ʿ��� #b#t4001796##k�� ���Դ� ���� ������ �׳� �ְڳ�.");
				if(!cm.haveItem(4001796))
				{
					cm.gainItem(4001796, 1);
				}
				break;

				case 1:
				cm.sendNextPrev("�ٸ� ������ �θ��� �� ������ �ʿ��� #b#t4001017##k�� ���� ���Դ� ���� ������ �׳� �ְڳ�.");
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
				cm.sendNextPrev("�̰��� ���� ������ ���ܿ� ����߸��� �ȴٳ�.");
				break;

				case 1:
				cm.sendNextPrev("�̰��� ������ ���ܿ� ����߸��� �ȴٳ�.");
				break;
			}
		}
	}

	else if(St == 5)
	{
		cm.dispose();
	}
}