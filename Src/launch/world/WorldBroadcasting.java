/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package launch.world;

import launch.ChannelServer;
//import packet.transfer.write.byte[];

/** ��� ä�ο� ��Ŷ�� ����ϴ� ��� ����.
 *
 * 
 * @author Ƽ��
 *
 * since 2012. 2. 24
     * 
     * @since Revision 25
 */
public class WorldBroadcasting {
    /** ��� ä�ο� ��������Ŷ ������ ��Ŷ�� ������.
     * 
     * @param <Packet> ��������Ŷ
     * 
     * @since Revision 25
     */
    public static void broadcastMessage(byte[] data) {
        broadcast(data);
    }
    /** ��� ä�ο� ��������Ŷ ������ ��Ŷ�� ������.
     * 
     * @param <Packet> ��������Ŷ
     * 
     * @since Revision 25
     */
    
    public static void broadcastSmega(byte[] data) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.broadcastSmegaPacket(data);
        }
    }
    
    public static void broadcastGM(byte[] data) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.broadcastGMPacket(data);
        }
    }
    public static void broadcast(byte[] data) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.broadcastPacket(data);
        }
    }
    /** ��� ä�ο� Ȯ���⸦ �����ϴ� ������ �� �� �ִ� ��Ŷ�� ������.
     * 
     * @param <byte[]> ����Ʈ�迭
     * 
     * @since Revision 25
     */
    /** ��� ä�ο� GM�� ���� �� �ִ� ��Ŷ�� ������.
     * 
     * @param <byte[]> ����Ʈ�迭
     * 
     * @since Revision 25
     */
    
    
    /** ��� ä�ο� ģ�� �α׿��� ��Ŷ�� ������.
     * 
     * @param <String> ������Ʈĳ���� 
     * @param <int> ������Ʈĳ��ID 
     * @param <int> ä�� 
     * @param <int[]> ��Ŷ���۴��ģ��ID���
     * 
     * @since Revision 25
     */
    public static void loggedOff(String name, int characterId, int channel, int[] buddies) {
        for (ChannelServer cserv : ChannelServer.getAllInstances())
            cserv.updateBuddies(characterId, channel, buddies, true);
    }
    
    /** ��� ä�ο� ģ�� �α׿� ��Ŷ�� ������.
     * 
     * @param <String> ������Ʈĳ���� 
     * @param <int> ������Ʈĳ��ID 
     * @param <int> ä�� 
     * @param <int[]> ��Ŷ���۴��ģ��ID���
     * 
     * @since Revision 25
     */
    public static void loggedOn(String name, int characterId, int channel, int buddies[]) {
        for (ChannelServer cserv : ChannelServer.getAllInstances())
            cserv.updateBuddies(characterId, channel, buddies, false);
    }
}
