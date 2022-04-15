importPackage(Packages.client.items);
importPackage(Packages.server.items);
importPackage(Packages.packet.creators);
importPackage(Packages.launch.world);

function start()
{
	St = -1;
	action(1, 0, 0);
}

success_real = 100;
success_fake = 10;

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
		cm.sendSimple("���� �����ߵ��� ������ �����ǰų� �׷��� ��찡 �ִٸ� �������� �����ߵ�����(080-757-5535)�� �ѱ����ڹ�����������(�������� 1336), ���������հ�������ȸ(1588-0112) �� ��������������� ������ ���� �� �ֽ��ϴ�.#b\r\n"
				+ "#L0#��������� ���� �������� �ι�� �Ҹ��ϴ�. (���� #e"+success_fake+"#n%)\r\n"
				+ "#L1#���� ������ ���� ���������� �ھ�.\r\n");
	}

	else if(St == 1)
	{
		S1 = S;
		switch(S1)
		{
			case 0: cm.sendSimpleS("(��� �κ��丮�� �����غ���? ĳ�� �κ��丮�� ������ �� ���ס�?)\r\n#b"
						+ "#L1#��� �κ��丮#l\r\n"
						+ "#L2#�Һ� �κ��丮#l\r\n"
						+ "#L3#��ġ �κ��丮#l\r\n"
						+ "#L4#��Ÿ �κ��丮#l\r\n", 2);
				break;

			case 1: cm.dispose();
				break;
		}
	}

	else if(St == 2)
	{
		S2 = S;
		inz = "(�κ��丮�� �ִ� �������� �� �������Ҵ�. ��� �������� �����غ���?)\r\n#b";
		for(i = 0; i < cm.getInventory(S2).getSlotLimit(); i++)
		{
			if(cm.getInventory(S2).getItem(i) == null)
			{
				continue;
			}
			inz += "#L"+ i +"##i"+cm.getInventory(S2).getItem(i).getItemId()+":# #t"+cm.getInventory(S2).getItem(i).getItemId()+"# "+cm.getInventory(S2).getItem(i).getQuantity()+"��#l\r\n";
		}
		cm.sendSimpleS(inz, 2);
	}

	else if(St == 3)
	{
		S3 = S;
		cm.sendYesNo("���, #b#i"+cm.getInventory(S2).getItem(S3).getItemId()+":# #t"+cm.getInventory(S2).getItem(S3).getItemId()+"# #e"+cm.getInventory(S2).getItem(S3).getQuantity()+"#n��#k�� �����ϼ̱���. ������ �����Ͻðھ��? ����� ���� ��� å���� #h #���� ���ž� �Ѵ�ϴ�.");
	}

	else if(St == 4)
	{
		if(!cm.canHold(cm.getInventory(S2).getItem(S3).getItemId()))
		{
			cm.sendOk("#h #���� ������ ���������� ���ڿ� �����ص� ���� ������ ������ ������ �� �� ���׿�. �κ��丮�� ���� ������ Ȯ���� �� �ٽ� �õ����ּ���.");
			cm.dispose();
			return;
		}

		fakeRand = Math.floor(Math.random() * 100);
		if(fakeRand < success_real)
		{
			cm.sendOk("�̷�, ���� �� �����ñ���. �������� ���� ����� �ֱ� �ٶ��Կ�.");
			switch(S2)
			{
				case 1: InventoryManipulator.removeFromSlot(cm.getClient(), MapleInventoryType.EQUIP, S3, cm.getInventory(S2).getItem(S3).getQuantity(), false); break;
				case 2: InventoryManipulator.removeFromSlot(cm.getClient(), MapleInventoryType.USE,   S3, cm.getInventory(S2).getItem(S3).getQuantity(), false); break;
				case 3: InventoryManipulator.removeFromSlot(cm.getClient(), MapleInventoryType.SETUP, S3, cm.getInventory(S2).getItem(S3).getQuantity(), false); break;
				case 4: InventoryManipulator.removeFromSlot(cm.getClient(), MapleInventoryType.ETC,   S3, cm.getInventory(S2).getItem(S3).getQuantity(), false); break;
			}
			cm.dispose();
			return;
		}
			WorldBroadcasting.broadcastMessage(MainPacketCreator.getGMText(23, "" + cm.getPlayer().getName() + "�� ���ϵ����. ���� ���� �����ñ���. ������ �ζ� �� �� �纸�°� ����?"));
		if(S2 != 1)
		{
			cm.gainItem(cm.getInventory(S2).getItem(S3).getItemId(), cm.getInventory(S2).getItem(S3).getQuantity());
		}
		else
		{
			InventoryManipulator.addFromDrop(cm.getClient(), cm.getInventory(S2).getItem(S3).copy(), true);
		}
		cm.dispose();
	}
}				