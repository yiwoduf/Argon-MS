/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package client;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author 4����
 */
public class MapleSaveItemPot { // �Ʒ��� ������ �����ϸ� ��� ������ �����
        protected Map <Integer, MapleItempot> imphold = new HashMap<Integer, MapleItempot>();
      
        public void putImp(MapleItempot imp) { // ���������� �ش罽�Կ� �߰�
            imphold.put(imp.getSlot(), imp);
        }
        
        public MapleItempot getImpInSlot(int slot) { // Ư�����Կ� ���������� �ҷ���
            return imphold.get(slot);
        }
        
        public void removeImpInSlot(int slot) { // ���������� �ش罽�Կ��� ����
            imphold.remove(slot);
        }
}
