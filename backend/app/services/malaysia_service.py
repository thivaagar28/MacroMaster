from typing import List
import pymongo
from datetime import datetime, timedelta
from bson import datetime as bson_datetime
#import database models, schemes
from app.models.malaysia_model import Malaysia
from app.schemas.malaysia_schema import Month, StatPoc1, StatPoc12, FeaturesPoc1, FeaturesPoc12, CmptPoc1, CmptPoc12

start_date = datetime.strptime('2010-01', '%Y-%m')
cutoff_date = datetime.strptime('2024-05', '%Y-%m')
feature_start_date = datetime.strptime('2020-05', '%Y-%m')

class MalaysiaService:
    @staticmethod
    async def get_months_list_poc1() -> List[Month]:
        return await Malaysia.find(Malaysia.month >= start_date, Malaysia.month <= cutoff_date).sort(-Malaysia.month).to_list()
    
    @staticmethod
    async def get_months_list_poc12() -> List[Month]:
        temp_start_date = start_date + timedelta(31 *11) # add 12 months
        return await Malaysia.find(Malaysia.month >= temp_start_date, Malaysia.month <= cutoff_date).sort(-Malaysia.month).to_list()
    
    @staticmethod
    async def get_stat_poc1(month: datetime) -> StatPoc1:
        stat_poc1 = await Malaysia.find_one(Malaysia.month == month)
        if not stat_poc1:
            raise pymongo.errors.OperationFailure(f"POC 1 stat data for {month} not found")
        
        return stat_poc1
    
    @staticmethod
    async def get_stat_poc12(month: datetime) -> StatPoc12:
        stat_poc12 = await Malaysia.find_one(Malaysia.month == month)
        if not stat_poc12:
            raise pymongo.errors.OperationFailure(f"POC 12 stat data for {month} not found")
        
        return stat_poc12
    
    @staticmethod
    async def get_poc1_features() -> FeaturesPoc1:
        return await Malaysia.find(Malaysia.month >= feature_start_date, Malaysia.month <= cutoff_date).sort(Malaysia.month).to_list()
    
    @staticmethod
    async def get_poc12_features() -> FeaturesPoc12:
        return await Malaysia.find(Malaysia.month >= feature_start_date, Malaysia.month <= cutoff_date).sort(Malaysia.month).to_list()
    
    @staticmethod
    async def get_poc1_cmpt() -> CmptPoc1:
        temp_cutoff_date = cutoff_date + timedelta(31) # add 1 months
        return await Malaysia.find(Malaysia.month >= feature_start_date, Malaysia.month <= temp_cutoff_date).sort(Malaysia.month).to_list()
    
    @staticmethod
    async def get_poc12_cmpt() -> CmptPoc12:
        temp_cutoff_date = cutoff_date + timedelta(31 * 12) # add 12 months
        return await Malaysia.find(Malaysia.month >= feature_start_date, Malaysia.month <= temp_cutoff_date).sort(Malaysia.month).to_list()