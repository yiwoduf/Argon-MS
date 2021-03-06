/*
 This file is part of the OdinMS Maple Story Server
 Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc> 
 Matthias Butz <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License version 3
 as published by the Free Software Foundation. You may not use, modify
 or distribute this program under any other version of the
 GNU Affero General Public License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package handler.mina;

import client.MapleClient;
import java.util.concurrent.locks.Lock;
import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoSession;
import org.apache.mina.filter.codec.ProtocolEncoder;
import org.apache.mina.filter.codec.ProtocolEncoderOutput;
import packet.crypto.MapleCrypto;

public class MaplePacketEncoder implements ProtocolEncoder {

    @Override
    public void encode(final IoSession session, final Object message, final ProtocolEncoderOutput out) throws Exception {
        final MapleClient client = (MapleClient) session.getAttribute(MapleClient.CLIENT_KEY);

	if (client != null) {
	    final Lock mutex = client.getLock();

	    mutex.lock();
	    try {
		final MapleCrypto send_crypto = client.getSendCrypto();

		final byte[] inputInitialPacket = (byte[]) message;
		byte[] unencrypted = new byte[inputInitialPacket.length];
		System.arraycopy(inputInitialPacket, 0, unencrypted, 0, inputInitialPacket.length); // Copy the input > "unencrypted"

		final byte[] ret = new byte[unencrypted.length + 4]; // Create new bytes with length = "unencrypted" + 4
		final byte[] header = send_crypto.getPacketHeader(unencrypted.length);

		unencrypted = send_crypto.crypt(unencrypted); // Crypt it with IV

		System.arraycopy(header, 0, ret, 0, 4); // Copy the header > "Ret", first 4 bytes
		System.arraycopy(unencrypted, 0, ret, 4, unencrypted.length); // Copy the unencrypted > "ret"
		out.write(ByteBuffer.wrap(ret));
	    } finally {
		mutex.unlock();
	    }
	} else { // no client object created yet, send unencrypted (hello)
	    out.write(ByteBuffer.wrap((byte[]) message));
	}
    }

    @Override
    public void dispose(IoSession session) throws Exception {
        // nothing to do
    }
}
