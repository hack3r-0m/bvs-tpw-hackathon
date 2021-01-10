import requests

url = "https://ethgasstation.info/api/ethgasAPI.json?api-key="
result = requests.get(url).json()

result.pop('gasPriceRange', None)

r2 = requests.post("https://pg-app-gbqap934o1ljag1iyc43d92z6y7cq4.scalabl.cloud/1/classes/stats", headers={
            "X-Parse-Application-Id": "",
            "X-Parse-REST-API-Key": "",
            "X-Parse-Revocable-Session": "1",
            "Content-Type": "application/json"      
                }, json=result).json()
