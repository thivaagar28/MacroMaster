from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, status, Depends
import pymongo
from typing import List
from bson import datetime as bson_datetime
from typing import Any
import math
from fastapi.responses import StreamingResponse
from motor.motor_asyncio import AsyncIOMotorClient
import pandas as pd
import numpy as np
import io

#import database models, service and schema
from app.models.usa_model import USA
from app.schemas.usa_schema import StandardStat, MarketMoodPoc, MMIndexpoc
from app.services.usa_service import USAService
from app.models.users_model import Users
# import custom user dependency
from app.api.deps.user_deps import get_current_user

usa_router = APIRouter()

def rounder(value, mul = 1):
    return (value if value == None else round(value * mul, 2))

def floor(value, mul = 1):
    return (value if value == None else math.floor(value * mul))

@usa_router.get('/poc1_months', summary="Get all month list for poc1" , response_model=List[str])
async def month_list_poc1():
    month_list = await USAService.get_months_list_poc1()
    converted_dates = [str(entry.month.strftime("%b %y")) for entry in month_list ]
    return converted_dates

@usa_router.get('/poc12_months', summary="Get all month list for poc12" , response_model=List[str])
async def month_list_poc12():
    month_list = await USAService.get_months_list_poc12()
    converted_dates = [str(entry.month.strftime("%b %y")) for entry in month_list ]
    return converted_dates

@usa_router.get('/{month}/poc1', summary="Get poc1 stat by month", response_model=StandardStat)
async def get_stat_poc1(month: str):
    month = datetime.strptime(month, "%b %y")
    data = await USAService.get_stat_poc1(month)
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
        dji_close = rounder(data.dji_close),
        dji = rounder(data.dji_poc1, 100),
        gspc_close= rounder(data.gspc_close),
        gspc = rounder(data.gspc_poc1, 100),
        ixic_close= rounder(data.ixic_close),
        ixic= rounder(data.ixic_poc1, 100),
        vix_close= rounder(data.vix_close),
        vix= rounder(data.vix_poc1, 100),
    )
    return response

@usa_router.get('/{month}/poc12', summary="Get poc12 stat by month", response_model=StandardStat)
async def get_stat_poc12(month: str):
    month = datetime.strptime(month, "%b %y")
    data = await USAService.get_stat_poc12(month)
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
        dji_close = rounder(data.dji_close),
        dji = rounder(data.dji_poc12, 100),
        gspc_close= rounder(data.gspc_close),
        gspc = rounder(data.gspc_poc12, 100),
        ixic_close= rounder(data.ixic_close),
        ixic= rounder(data.ixic_poc12, 100),
        vix_close= rounder(data.vix_close),
        vix= rounder(data.vix_poc12, 100),
    )
    return response

@usa_router.get('/mm_poc1', summary="Get market mood for poc1", response_model=MarketMoodPoc)
async def get_mm_poc1(user: Users = Depends(get_current_user)):
    cut_offdate = await USAService.get_cutoff_date()
    m1 = cut_offdate - timedelta(1) # remove 1 month
    y1 = cut_offdate - timedelta(31 * 11) # remove 12 month

    data = await USAService.get_poc1_mm()
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



@usa_router.get('/mm_poc12', summary="Get market mood for poc12", response_model=MarketMoodPoc)
async def get_mm_poc12(user: Users = Depends(get_current_user)):
    cut_offdate = await USAService.get_cutoff_date()
    m1 = cut_offdate - timedelta(1) # remove 1 month
    y1 = cut_offdate - timedelta(31 * 11) # remove 12 month


    data = await USAService.get_poc12_mm()
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

@usa_router.get('/mmi_poc1', summary="Get market mood and indices for poc1", response_model=MMIndexpoc)
async def get_mmi_poc1(user: Users = Depends(get_current_user)):
    data = await USAService.get_poc1_mmi()
     # Slice the data to include only the last 15 items
    data = data[-15:]
    transformed_data = MMIndexpoc()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.dji.append(floor(item.dji_n_poc1, 100))
        transformed_data.gspc.append(floor(item.gspc_n_poc1, 100))
        transformed_data.ixic.append(floor(item.ixic_n_poc1, 100))
        transformed_data.vix.append(floor(item.vix_n_poc1, 100))
        transformed_data.MarketMood.append(floor(item.MarketMood_poc1, 100))
        transformed_data.pred_MarketMood.append(floor(item.pred_MarketMood_poc1, 100))

    return transformed_data

@usa_router.get('/mmi_poc12', summary="Get market mood and indices for poc12", response_model=MMIndexpoc)
async def get_mmi_poc12(user: Users = Depends(get_current_user)):
    data = await USAService.get_poc12_mmi()
    # Slice the data to include only the last 20 items
    data = data[-20:]
    transformed_data = MMIndexpoc()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.dji.append(floor(item.dji_n_poc12, 100))
        transformed_data.gspc.append(floor(item.gspc_n_poc12, 100))
        transformed_data.ixic.append(floor(item.ixic_n_poc12, 100))
        transformed_data.vix.append(floor(item.vix_n_poc12, 100))
        transformed_data.MarketMood.append(floor(item.MarketMood_poc12, 100))
        transformed_data.pred_MarketMood.append(floor(item.pred_MarketMood_poc12, 100))

    return transformed_data

@usa_router.get('/export_csv', summary="Export USA Collection as CSV")
async def export_csv(user: Users = Depends(get_current_user)):
    try:
        # Fetch all documents from the USA collection
        documents = await USAService.get_csv_data()

        # Convert documents to pandas DataFrame
        df = pd.DataFrame(documents)

        # List of columns to drop
        columns_to_drop = ['id', 'ixic_n_poc1', 'ixic_n_poc12', 'vix_n_poc1', 'vix_n_poc12', 'dji_n_poc1', 'dji_n_poc12', 'gspc_n_poc1', 'gspc_n_poc12'] 

        df = df.drop(columns=columns_to_drop)

        # Convert DataFrame to CSV
        output = io.StringIO()
        df.to_csv(output, index=False)
        output.seek(0)
        
        # Create streaming response
        response = StreamingResponse(io.BytesIO(output.getvalue().encode()), media_type="text/csv")
        response.headers["Content-Disposition"] = "attachment; filename=USA_collection_export.csv"
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@usa_router.get('/{index}', summary="Get index data")
async def get_index_data(index: str, user: Users = Depends(get_current_user)):
    try:
        # Fetch all documents from the USA collection
        documents = await USAService.get_csv_data()

        # Convert documents to pandas DataFrame
        df = pd.DataFrame(documents)

        cut_offdate = await USAService.get_cutoff_date()
        df = df[df['month'] <= cut_offdate]

        df = df.where(pd.notnull(df), None)
        #df = df.replace([np.inf, -np.inf], np.nan)
        #df = df.dropna()

        df['month'] = pd.to_datetime(df['month'])
        df['month'] = df['month'].dt.strftime("%b %y")

        # Convert all float values to strings
        df = df.applymap(lambda x: str(x) if isinstance(x, float) else x)

        #create a empty_dict

        empty_dict = {}

        if index == "cpi":
            empty_dict = {
                "month" : df['month'].tolist(),
                "cpi" : df['cpi_index'].tolist()
            }
        elif index == "inf":
            empty_dict = {
                "month" : df['month'].tolist(),
                "inflation_rate" : df['inf_poc1'].tolist()
            }
        elif index == "gr":
            empty_dict = {
                "month" : df['month'].tolist(),
                "government_reserves" : df['grb_index'].tolist()
            }
        elif index == "ipi":
            empty_dict = {
                "month" : df['month'].tolist(),
                "ipi" : df['ipi_index'].tolist()
            }
        elif index == "lt_ir":
            empty_dict = {
                "month" : df['month'].tolist(),
                "long_term_interest_rate" : df['lt_ir_poc1'].tolist()
            }
        elif index == "st_ir":
            empty_dict = {
                "month" : df['month'].tolist(),
                "short_term_interest_rate" : df['st_ir_poc1'].tolist()
            }
        elif index == "gdp":
            empty_dict = {
                "month" : df['month'].tolist(),
                "gdp" : df['gdpt_index'].tolist()
            }
        elif index == "ur":
            empty_dict = {
                "month" : df['month'].tolist(),
                "unemployment_rate" : df['ur_poc1'].tolist()
            }
        elif index == "ppi":
            empty_dict = {
                "month" : df['month'].tolist(),
                "ppi" : df['ppi_index'].tolist()
            }
        elif index == "wrt":
            empty_dict = {
                "month" : df['month'].tolist(),
                "wholesale_retail_trade" : df['wrt_index'].tolist()
            }
        elif index == "bcli":
            empty_dict = {
                "month" : df['month'].tolist(),
                "business_cycle_leading_indicator" : df['bcli_index'].tolist()
            }
        else :
            return None

        return empty_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

'''
@usa_router.get('/features_poc1', summary="Get features selected for poc1", response_model=FeatureGraphPoc1)
async def get_features_poc1():
    data = await USAService.get_poc1_features()
    transformed_data = FeatureGraphPoc1()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.bcli.append(rounder(item.bcli_poc1))
        transformed_data.grb.append(rounder(item.grb_poc1))
        transformed_data.inf.append(rounder(item.inf_poc1))
        transformed_data.ipi.append(rounder(item.ipi_poc1))
        transformed_data.st_ir.append(rounder(item.st_ir_poc1))
        transformed_data.gspc.append(rounder(item.gspc_poc1))
        transformed_data.ixic.append(rounder(item.ixic_poc1))
        transformed_data.vix.append(rounder(item.vix_poc1))
    return transformed_data

@usa_router.get('/features_poc12', summary="Get features selected for poc12", response_model=FeatureGraphPoc12)
async def get_features_poc12():
    data = await USAService.get_poc12_features()
    transformed_data = FeatureGraphPoc12()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.bcli.append(rounder(item.bcli_poc12))
        transformed_data.inf.append(rounder(item.inf_poc12))
        transformed_data.lt_ir.append(rounder(item.lt_ir_poc12))
        transformed_data.ppi.append(rounder(item.ppi_poc12))
        transformed_data.gspc.append(rounder(item.gspc_poc12))
    return transformed_data

@usa_router.get('/cmpt_poc1', summary="Get composite index for poc1", response_model=CmptPoc)
async def get_features_poc1():
    data = await USAService.get_poc1_cmpt()
    transformed_data = CmptPoc()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.cmpt.append(rounder(item.cmpt_poc1))
        transformed_data.pred_cmpt.append(rounder(item.pred_cmpt_poc1))
    return transformed_data

@usa_router.get('/cmpt_poc12', summary="Get composite index for poc12", response_model=CmptPoc)
async def get_features_poc1():
    data = await USAService.get_poc12_cmpt()
    transformed_data = CmptPoc()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.cmpt.append(rounder(item.cmpt_poc12))
        transformed_data.pred_cmpt.append(rounder(item.pred_cmpt_poc12))
    return transformed_data
'''