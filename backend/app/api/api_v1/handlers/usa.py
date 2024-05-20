from datetime import datetime
from fastapi import APIRouter, HTTPException, status, Depends
import pymongo
from typing import List
from bson import datetime as bson_datetime

#import database models, service and schema
from app.models.usa_model import USA
from app.schemas.usa_schema import StatPoc1, StatPoc6, StatPoc12, Month
from app.services.usa_service import USAService

usa_router = APIRouter()

@usa_router.get('/poc1_months', summary="Get all month list for poc1" , response_model=List[str])
async def month_list_poc1():
    month_list = await USAService.get_months_list_poc1()
    converted_dates = [str(entry.month.strftime("%b %y")) for entry in month_list ]
    return converted_dates

@usa_router.get('/poc6_months', summary="Get all month list for poc6" , response_model=List[str])
async def month_list_poc6():
    month_list = await USAService.get_months_list_poc6()
    converted_dates = [str(entry.month.strftime("%b %y")) for entry in month_list ]
    return converted_dates

@usa_router.get('/poc12_months', summary="Get all month list for poc12" , response_model=List[str])
async def month_list_poc12():
    month_list = await USAService.get_months_list_poc12()
    converted_dates = [str(entry.month.strftime("%b %y")) for entry in month_list ]
    return converted_dates

@usa_router.get('/{month}/poc1', summary="Get poc1 stat by month", response_model=StatPoc1)
async def get_stat_poc1(month: str):
    month = datetime.strptime(month, "%b %y")
    return await USAService.get_stat_poc1(month)

@usa_router.get('/{month}/poc6', summary="Get poc6 stat by month", response_model=StatPoc6)
async def get_stat_poc6(month: str):
    month = datetime.strptime(month, "%b %y")
    return await USAService.get_stat_poc6(month)

@usa_router.get('/{month}/poc12', summary="Get poc12 stat by month", response_model=StatPoc12)
async def get_stat_poc12(month: str):
    month = datetime.strptime(month, "%b %y")
    return await USAService.get_stat_poc12(month)
