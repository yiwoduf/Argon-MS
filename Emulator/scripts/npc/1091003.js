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
		cm.sendSimple("만약 도박중독에 빠졌다 생각되거나 그러한 경우가 있다면 강원랜드 도박중독센터(080-757-5535)나 한국도박문제관리센터(국번없이 1336), 사행산업통합감독위원회(1588-0112) 등 관련전문기관에서 도음을 받을 수 있습니다.#b\r\n"
				+ "#L0#사랑스러운 나의 아이템을 두배로 불립니다. (성공 #e"+success_fake+"#n%)\r\n"
				+ "#L1#여긴 위험해 당장 빠져나가야 겠어.\r\n");
	}

	else if(St == 1)
	{
		S1 = S;
		switch(S1)
		{
			case 0: cm.sendSimpleS("(어느 인벤토리를 선택해볼까? 캐시 인벤토리는 선택할 수 없네…?)\r\n#b"
						+ "#L1#장비 인벤토리#l\r\n"
						+ "#L2#소비 인벤토리#l\r\n"
						+ "#L3#설치 인벤토리#l\r\n"
						+ "#L4#기타 인벤토리#l\r\n", 2);
				break;

			case 1: cm.dispose();
				break;
		}
	}

	else if(St == 2)
	{
		S2 = S;
		inz = "(인벤토리에 있는 아이템을 다 꺼내보았다. 어느 아이템을 선택해볼까?)\r\n#b";
		for(i = 0; i < cm.getInventory(S2).getSlotLimit(); i++)
		{
			if(cm.getInventory(S2).getItem(i) == null)
			{
				continue;
			}
			inz += "#L"+ i +"##i"+cm.getInventory(S2).getItem(i).getItemId()+":# #t"+cm.getInventory(S2).getItem(i).getItemId()+"# "+cm.getInventory(S2).getItem(i).getQuantity()+"개#l\r\n";
		}
		cm.sendSimpleS(inz, 2);
	}

	else if(St == 3)
	{
		S3 = S;
		cm.sendYesNo("어머, #b#i"+cm.getInventory(S2).getItem(S3).getItemId()+":# #t"+cm.getInventory(S2).getItem(S3).getItemId()+"# #e"+cm.getInventory(S2).getItem(S3).getQuantity()+"#n개#k를 선택하셨군요. 정말로 진행하시겠어요? 결과에 대한 모든 책임은 #h #님이 지셔야 한답니다.");
	}

	else if(St == 4)
	{
		if(!cm.canHold(cm.getInventory(S2).getItem(S3).getItemId()))
		{
			cm.sendOk("#h #님이 선택한 아이템으로 도박에 성공해도 여유 공간이 부족해 수령을 할 수 없네요. 인벤토리에 여유 공간을 확보한 뒤 다시 시도해주세요.");
			cm.dispose();
			return;
		}

		fakeRand = Math.floor(Math.random() * 100);
		if(fakeRand < success_real)
		{
			cm.sendOk("이런, 운이 안 좋으시군요. 다음에는 좋은 결과가 있길 바랄게요.");
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
			WorldBroadcasting.broadcastMessage(MainPacketCreator.getGMText(23, "" + cm.getPlayer().getName() + "님 축하드려요. 정말 운이 좋으시군요. 오늘은 로또 한 장 사보는게 어떨까요?"));
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