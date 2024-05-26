from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, status, Depends
import pymongo
from typing import List
from bson import datetime as bson_datetime
from typing import Any
from fastapi.responses import StreamingResponse
from motor.motor_asyncio import AsyncIOMotorClient
import pandas as pd
import io
import math

#import database models, service and schema
from app.models.malaysia_model import Malaysia
from app.services.malaysia_service import MalaysiaService
from app.schemas.malaysia_schema import StandardStat, MarketMoodPoc, MMIndexpoc
from app.models.users_model import Users
# import custom user dependency
from app.api.deps.user_deps import get_current_user

malaysia_router = APIRouter()

def rounder(value, mul = 1):
    return (value if value == None else round(value * mul, 2))
        
def floor(value, mul = 1):
    return (value if value == None else math.floor(value * mul))

@malaysia_router.get('/poc1_months', summary="Get all month list for poc1" , response_model=List[str])
async def month_list_poc1():
    month_list = await MalaysiaService.get_months_list_poc1()
    converted_dates = [str(entry.month.strftime("%b %y")) for entry in month_list ]
    return converted_dates

@malaysia_router.get('/poc12_months', summary="Get all month list for poc12" , response_model=List[str])
async def month_list_poc12():
    month_list = await MalaysiaService.get_months_list_poc12()
    converted_dates = [str(entry.month.strftime("%b %y")) for entry in month_list ]
    return converted_dates

@malaysia_router.get('/{month}/poc1', summary="Get poc1 stat by month", response_model= StandardStat)
async def get_stat_poc1(month: str):
    month = datetime.strptime(month, "%b %y")
    data = await MalaysiaService.get_stat_poc1(month)
    #transformed_data = {attr: transform_value(getattr(data, attr)) for attr in data.model_fields}
    #modified_data = {key.replace('_poc1', ''): value for key, value in data.model_dump().items()}
    response = StandardStat(
        bcli= rounder(data.bcli_poc1, 100),
        cpi = rounder(data.cpi_poc1, 100),
        gdpt = rounder(data.gdpt_poc1, 100),
        grb = rounder(data.grb_poc1, 100),
        inf = rounder(data.inf_poc1, 100),
        ipi = rounder(data.ipi_poc1, 100),
        lt_ir= rounder(data.lt_ir_poc1, 100),
        ppi= rounder(data.ppi_poc1, 100),
        st_ir= rounder(data.st_ir_poc1, 100),
        ur= rounder(data.ur_poc1, 100),
        wrt = rounder(data.wrt_poc1, 100),
        klse = rounder(data.klse_poc1, 100),
        klse_close= rounder(data.klse_close)
    )
    return response

@malaysia_router.get('/{month}/poc12', summary="Get poc12 stat by month", response_model=StandardStat)
async def get_stat_poc12(month: str):
    month = datetime.strptime(month, "%b %y")
    data = await MalaysiaService.get_stat_poc12(month)
    #modified_data = {key.replace('_poc12', ''): value for key, value in data.model_dump().items()}
    response = StandardStat(
        bcli= rounder(data.bcli_poc12, 100),
        cpi = rounder(data.cpi_poc12, 100),
        gdpt = rounder(data.gdpt_poc12, 100),
        grb = rounder(data.grb_poc12, 100),
        inf = rounder(data.inf_poc12, 100),
        ipi = rounder(data.ipi_poc12, 100),
        lt_ir= rounder(data.lt_ir_poc12, 100),
        ppi= rounder(data.ppi_poc12, 100),
        st_ir= rounder(data.st_ir_poc12, 100),
        ur= rounder(data.ur_poc12, 100),
        wrt = rounder(data.wrt_poc12, 100),
        klse = rounder(data.klse_poc12, 100),
        klse_close= rounder(data.klse_close)
    )
    return response

@malaysia_router.get('/mm_poc1', summary="Get market mood for poc1", response_model=MarketMoodPoc)
async def get_mm_poc1(user: Users = Depends(get_current_user)):
    cut_offdate = await MalaysiaService.get_cutoff_date()
    m1 = cut_offdate - timedelta(1) # remove 1 month
    y1 = cut_offdate - timedelta(31 * 11) # remove 12 month

    data = await MalaysiaService.get_poc1_mm()
    transformed_data = MarketMoodPoc()

    # Define the target months
    target_months = {
        cut_offdate.strftime("%b %y"),
        m1.strftime("%b %y"),
        y1.strftime("%b %y")
    }

    # Append only the target months
    for item in data:
        item_month_str = item.month.strftime("%b %y")
        if item_month_str in target_months:
            transformed_data.month.append(item_month_str)
            transformed_data.MarketMood.append(rounder(item.MarketMood_poc1, 100))
            
            # Remove the appended month from target_months to avoid redundant checks
            target_months.remove(item_month_str)

        # Break the loop if all target months are found
        if not target_months:
            break

    return transformed_data
    '''
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.MarketMood.append(rounder(item.MarketMood_poc1, 100))
    return transformed_data
    '''


@malaysia_router.get('/mm_poc12', summary="Get market mood for poc12", response_model=MarketMoodPoc)
async def get_mm_poc12(user: Users = Depends(get_current_user)):
    cut_offdate = await MalaysiaService.get_cutoff_date()
    m1 = cut_offdate - timedelta(1) # remove 1 month
    y1 = cut_offdate - timedelta(31 * 11) # remove 12 month


    data = await MalaysiaService.get_poc12_mm()
    transformed_data = MarketMoodPoc()

    # Define the target months
    target_months = {
        cut_offdate.strftime("%b %y"),
        m1.strftime("%b %y"),
        y1.strftime("%b %y")
    }

    # Append only the target months
    for item in data:
        item_month_str = item.month.strftime("%b %y")
        if item_month_str in target_months:
            transformed_data.month.append(item_month_str)
            transformed_data.MarketMood.append(rounder(item.MarketMood_poc12, 100))
            
            # Remove the appended month from target_months to avoid redundant checks
            target_months.remove(item_month_str)

        # Break the loop if all target months are found
        if not target_months:
            break

    return transformed_data

    '''
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.MarketMood.append(rounder(item.MarketMood_poc12, 100))
    return transformed_data
    '''


@malaysia_router.get('/mmi_poc1', summary="Get market mood and indices for poc1", response_model=MMIndexpoc)
async def get_mmi_poc1(user: Users = Depends(get_current_user)):
    data = await MalaysiaService.get_poc1_mmi()
    # Slice the data to include only the last 15 items
    data = data[-15:]
    transformed_data = MMIndexpoc()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.klse.append(floor(item.klse_n_poc1, 100))
        transformed_data.MarketMood.append(floor(item.MarketMood_poc1, 100))
        transformed_data.pred_MarketMood.append(floor(item.pred_MarketMood_poc1, 100))

    return transformed_data

@malaysia_router.get('/mmi_poc12', summary="Get market mood and indices for poc12", response_model=MMIndexpoc)
async def get_mmi_poc12(user: Users = Depends(get_current_user)):
    data = await MalaysiaService.get_poc12_mmi()
    # Slice the data to include only the last 20 items
    data = data[-20:]
    transformed_data = MMIndexpoc()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.klse.append(floor(item.klse_n_poc12, 100))
        transformed_data.MarketMood.append(floor(item.MarketMood_poc12, 100))
        transformed_data.pred_MarketMood.append(floor(item.pred_MarketMood_poc12, 100))

    return transformed_data

@malaysia_router.get('/export_csv', summary="Export Malaysia Collection as CSV")
async def export_csv(user: Users = Depends(get_current_user)):
    try:
        # Fetch all documents from the USA collection
        documents = await MalaysiaService.get_csv_data()

        # Convert documents to pandas DataFrame
        df = pd.DataFrame(documents)

        # List of columns to drop
        columns_to_drop = ['id', 'klse_n_poc1', 'klse_n_poc12'] 

        df = df.drop(columns=columns_to_drop)

        # Convert DataFrame to CSV
        output = io.StringIO()
        df.to_csv(output, index=False)
        output.seek(0)
        
        # Create streaming response
        response = StreamingResponse(io.BytesIO(output.getvalue().encode()), media_type="text/csv")
        response.headers["Content-Disposition"] = "attachment; filename=Malaysia_collection_export.csv"
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

'''
@usa_router.get('/features_poc1', summary="Get features selected for poc1", response_model=FeaturesGraphPoc1)
async def get_features_poc1():
    data = await MalaysiaService.get_poc1_features()
    transformed_data = FeaturesGraphPoc1()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.bcli.append(rounder(item.bcli_poc1))
        transformed_data.cpi.append(rounder(item.cpi_poc1))
        transformed_data.grb.append(rounder(item.grb_poc1))
        transformed_data.klse.append(rounder(item.klse_poc1))
        transformed_data.ppi.append(rounder(item.ppi_poc1))
        transformed_data.st_ir.append(rounder(item.st_ir_poc1))
    return transformed_data

@usa_router.get('/features_poc12', summary="Get features selected for poc12", response_model=FeaturesGraphPoc12)
async def get_features_poc12():
    data = await MalaysiaService.get_poc12_features()
    transformed_data = FeaturesGraphPoc12()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.grb.append(rounder(item.grb_poc12))
        transformed_data.inf.append(rounder(item.inf_poc12))
        transformed_data.ppi.append(rounder(item.ppi_poc12))
        transformed_data.st_ir.append(rounder(item.st_ir_poc12))
    return transformed_data


@usa_router.get('/cmpt_poc1', summary="Get composite index for poc1", response_model=CmptPoc)
async def get_features_poc1():
    data = await MalaysiaService.get_poc1_cmpt()
    transformed_data = CmptPoc()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.cmpt.append(rounder(item.cmpt_poc1))
        transformed_data.pred_cmpt.append(rounder(item.pred_cmpt_poc1))
    return transformed_data

@usa_router.get('/cmpt_poc12', summary="Get composite index for poc12", response_model=CmptPoc)
async def get_features_poc1():
    data = await MalaysiaService.get_poc12_cmpt()
    transformed_data = CmptPoc()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.cmpt.append(rounder(item.cmpt_poc12))
        transformed_data.pred_cmpt.append(rounder(item.pred_cmpt_poc12))
    return transformed_data
'''