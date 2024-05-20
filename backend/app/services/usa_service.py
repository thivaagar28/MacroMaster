from typing import List
import pymongo
from datetime import datetime, timedelta
from bson import datetime as bson_datetime
#import database models, schemes
from app.models.usa_model import USA
from app.schemas.usa_schema import StatPoc1, StatPoc6, StatPoc12, Month

start_date = datetime.strptime('1992-01', '%Y-%m')
cutoff_date = datetime.strptime('2024-05', '%Y-%m')

class USAService:
    @staticmethod
    async def get_months_list_poc1() -> List[Month]:
        return await USA.find(USA.month >= start_date, USA.month <= cutoff_date).sort().to_list()
    
    @staticmethod
    async def get_months_list_poc6() -> List[Month]:
        temp_start_date = start_date + timedelta(31 *5) # add 6 months
        return await USA.find(USA.month >= temp_start_date, USA.month <= cutoff_date).sort().to_list()
    
    @staticmethod
    async def get_months_list_poc12() -> List[Month]:
        temp_start_date = start_date + timedelta(31 *11) # add 12 months
        return await USA.find(USA.month >= temp_start_date, USA.month <= cutoff_date).sort().to_list()
    
    @staticmethod
    async def get_stat_poc1(month: datetime) -> StatPoc1:
        stat_poc1 = await USA.find_one(USA.month == month)
        if not stat_poc1:
            raise pymongo.errors.OperationFailure(f"POC 1 stat data for {month} not found")
        
        return stat_poc1

    @staticmethod
    async def get_stat_poc6(month: datetime) -> StatPoc6:
        stat_poc6 = await USA.find_one(USA.month == month)
        if not stat_poc6:
            raise pymongo.errors.OperationFailure(f"POC 6 stat data for {month} not found")
        
        return stat_poc6
    
    @staticmethod
    async def get_stat_poc12(month: datetime) -> StatPoc12:
        stat_poc12 = await USA.find_one(USA.month == month)
        if not stat_poc12:
            raise pymongo.errors.OperationFailure(f"POC 12 stat data for {month} not found")
        
        return stat_poc12