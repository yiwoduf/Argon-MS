/*
 * Copyright (C) 2013 Nemesis Maple Story Online Server Program

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package database;

import constants.ServerConstants;

public class MYSQLOption {
    public static final String MySQLURL = "jdbc:mysql://localhost:3306/argononline?autoReconnect=true&characterEncoding=euckr&maxReconnects=5";
    public static final String MySQLUSER = ServerConstants.dbUser;
    public static final String MySQLPASS = ServerConstants.dbPassword;
    
    public static int MySQLMINCONNECTION = 100;
    public static int MySQLMAXCONNECTION = 2100000000;

}
