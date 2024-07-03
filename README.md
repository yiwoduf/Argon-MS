# Argon MS - Maplestory Clone Project

Welcome to Argon MS, a clone project of the popular game Maplestory, translating in to English (GMS standard)

**Please note that all rights related to the original game Maplestory belong to Nexon. This project is a clone and is not affiliated with Nexon.**

![alt text](./images/hello.PNG "Logo Title Text 1")

KMST v1029

## 🛠️- Tools

- **Java JDK 8**: ☕ The core language used for development.
- **MariaDB**: 🗃️ Used for the server database.
- **MySQL Client**: 📊 Used for database management.
- **SQL**: 📑 Managing and manipulating the database.
- **JavaScript**: 📜 Used for creating NPC scripts.
- **OllyDBG**: 🔍 Client Reverse Engineering.
- **Bash**: 🖥️ Used for scripting and automation.
- **WIZET**: Game image data files.
- **HaRepacker**: [Link to HaRepacker](https://github.com/lastbattle/Harepacker-resurrected)
- **XML**: 📦 Used for storing data in a format that can be easily shared.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Java JDK 8
- MariaDB
- MySQL Client

### Clone

1. Clone the repo
   ```sh
   git clone https://github.com/yiwoduf/Argon-MS.git
   ```

### Server Configuration

```js
#   [맵설정]
시작맵 = 350140100
마을맵 = 100000000

#   [배율설정]
경험치배율 = 10
메소배율 = 1
드롭배율 = 1
캐시배율 = 1
보스캐시배율 = 4

#   [개수설정]
최대드랍아이템개수 = 4
최대보스드랍아이템개수 = 4
서버개수 = 5
캐릭터슬롯 = 4
아이피당계정수 = 3

#   [서버상태설정]
Flag = 2
아이피 = 127.0.0.1
이벤트 = 1
로그인포트 = 8484
채널포트 = 8585
캐시샵포트 = 8700
친구서버포트 = 9900

#   [기타설정]
서버점검 = false
패킷출력 = true
최대드랍사용 = true
최대보스드랍사용 = true
붐업경험치이벤트 = false

#   [DB]
Arc.dbHost = localhost
Arc.dbPort = 3306
Arc.dbUser = root
Arc.dbPassword =

#    [클라이언트 버전]
클라이언트버전 = 1029
마이너버전 = 1

```

Project Link: https://github.com/yiwoduf/Argon-MS
