from typing import List
import pymongo
from datetime import datetime, timedelta
from bson import datetime as bson_datetime
#import database models, schemes
from app.models.usa_model import USA
from app.schemas.usa_schema import StatPoc1, StatPoc12, Month, MarketMoodPoc1, MarketMoodPoc12, MMIndexpoc1, MMIndexpoc12

start_date = datetime.strptime('1992-01', '%Y-%m')
cutoff_date = datetime.strptime('2024-05', '%Y-%m')
feature_start_date = datetime.strptime('2020-05', '%Y-%m')

class USAService:
    @staticmethod
    async def get_months_list_poc1() -> List[Month]:
        return await USA.find(USA.month >= start_date, USA.month <= cutoff_date).sort(-USA.month).to_list()
    
    @staticmethod
    async def get_months_list_poc12() -> List[Month]:
        temp_start_date = start_date + timedelta(31 *11) # add 12 months
        return await USA.find(USA.month >= temp_start_date, USA.month <= cutoff_date).sort(-USA.month).to_list()
    
    @staticmethod
    async def get_stat_poc1(month: datetime) -> StatPoc1:
        stat_poc1 = await USA.find_one(USA.month == month)
        if not stat_poc1:
            raise pymongo.errors.OperationFailure(f"POC 1 stat data for {month} not found")
        
        return stat_poc1
    
    @staticmethod
    async def get_stat_poc12(month: datetime) -> StatPoc12:
        stat_poc12 = await USA.find_one(USA.month == month)
        if not stat_poc12:
            raise pymongo.errors.OperationFailure(f"POC 12 stat data for {month} not found")
        
        return stat_poc12
    
    @staticmethod
    async def get_poc1_mm() -> MarketMoodPoc1:
        return await USA.find(USA.month >= start_date, USA.month <= cutoff_date).sort(-USA.month).to_list()

    @staticmethod
    async def get_poc12_mm() -> MarketMoodPoc12:
        return await USA.find(USA.month >= start_date, USA.month <= cutoff_date).sort(-USA.month).to_list()
    
    @staticmethod
    async def get_poc1_mmi() -> MMIndexpoc1:
        temp_cutoff_date = cutoff_date + timedelta(31) # add 1 months
        return await USA.find(USA.month >= start_date, USA.month <= temp_cutoff_date).sort(USA.month).to_list()

    @staticmethod
    async def get_poc12_mmi() -> MMIndexpoc12:
        temp_cutoff_date = cutoff_date + timedelta(31 * 12) # add 12 months
        return await USA.find(USA.month >= start_date, USA.month <= temp_cutoff_date).sort(USA.month).to_list()

    @staticmethod
    async def get_cutoff_date() -> datetime:
        return cutoff_date

    @staticmethod
    async def get_csv_data():
        # Fetch documents from the database and convert to dictionaries
        instances = await USA.find().to_list()
        data = [instance.model_dump() for instance in instances]
        return data

    '''
    @staticmethod
    async def get_poc1_features() -> FeaturesPoc1:
        return await USA.find(USA.month >= feature_start_date, USA.month <= cutoff_date).sort(USA.month).to_list()
    
    @staticmethod
    async def get_poc12_features() -> FeaturesPoc12:
        return await USA.find(USA.month >= feature_start_date, USA.month <= cutoff_date).sort(USA.month).to_list()
    
    @staticmethod
    async def get_poc1_cmpt() -> CmptPoc1:
        temp_cutoff_date = cutoff_date + timedelta(31) # add 1 months
        return await USA.find(USA.month >= feature_start_date, USA.month <= temp_cutoff_date).sort(USA.month).to_list()
    
    @staticmethod
    async def get_poc12_cmpt() -> CmptPoc12:
        temp_cutoff_date = cutoff_date + timedelta(31 * 12) # add 12 months
        return await USA.find(USA.month >= feature_start_date, USA.month <= temp_cutoff_date).sort(USA.month).to_list()
    '''        