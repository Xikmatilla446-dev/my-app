import React from "react";
import {Button, Row, Table} from 'antd'

import classes from "./Main.module.scss";
import {useGetDocumentsQuery} from "hooks/queries/general";
import get from 'lodash/get';
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";

const Main = () => {

    const getDocuments = useGetDocumentsQuery();
    const navigate = useNavigate();


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'DOCUMENT TITLE',
            dataIndex: 'document_name',
            key: 'document_name',
        },
        {
            title: 'CREATED ATE',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text: any) => <>{dayjs(text).format("DD.MM.YYYY")}</>,
        },
        {
            title: 'DOCUMENT SIZE',
            dataIndex: 'field_count',
            key: 'field_count',
        },
        {
            title: "_",
            dataIndex: 'id',
            key: 'id',
            render: (id: any) => <div className="flex-center"><Button>Document preview</Button></div>,
        },
    ];


    return (
        <div className={classes.main_page}>
            <div className={classes.box}>
                <Row justify={"end"}>
                    <Button onClick={()=> navigate("/main-form")}>New document form</Button>
                </Row>
                <Table
                    loading={getDocuments.isLoading}
                    dataSource={get(getDocuments, "data.data", [])} columns={columns}/>;
            </div>
        </div>
    );
};

export default Main;
