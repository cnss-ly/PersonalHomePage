import pymysql


def connectDatabase():
    useconnect = pymysql.connect(host="localhost",
                                 user="root",
                                 password="020509",
                                 database="PersonalHomePage",
                                 charset="utf8")
    return useconnect


def executeInsertsql(insertsql):
    useconnect = connectDatabase()
    cursor = useconnect.cursor()
    # print(insertsql)
    try:
        cursor.execute(insertsql)
        useconnect.commit()
    except:
        useconnect.rollback()
    useconnect.close()

def executeLookupsql(lookupsql):
    useconnect = connectDatabase()
    cursor = useconnect.cursor()
    try:
        cursor.execute(lookupsql)
        results = cursor.fetchall()
        useconnect.close()
        return results
    except:
        useconnect.close()
        return None