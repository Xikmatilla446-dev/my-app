import React, {useMemo} from 'react';
import {Controller, useFieldArray, useForm} from "react-hook-form";

import {object, string, array, number} from "yup";
import useYupValidationResolver from "hooks/queries/custom/useYupValidationResolver";
import classes from "./MainForm.module.scss";
import {Button, Checkbox, Col, Divider, Row} from "antd";
import {Input, Select} from "../../components/AntComponents";
import get from "lodash/get";
import {useGetDocumentsQuery} from "hooks/queries/general";
import useApiMutation from "../../hooks/queries/general/useGeneralMutation";
import {AxiosResponse, AxiosError} from "axios";
import {useNavigate} from "react-router-dom";

const MainForm = () => {
    const getDocuments = useGetDocumentsQuery();
    const documentsSaveMutation = useApiMutation("/api/v1/documents/create", "post", {});
    const navigate = useNavigate();

    const validationSchema = useMemo(
        () =>
            object({
                document_name: string().required("not empty"),
                form_values: array().of(
                    object().shape({
                        field_seq: string().required("not empty"),
                        is_mandatory: number().required("not empty"),
                        field_type: number(),
                        field_name: string(),
                    })
                )

            }),
        []
    );

    const resolver = useYupValidationResolver(validationSchema);

    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        reset,
        watch,
        formState: {errors}
    } = useForm<any>({
        defaultValues: {
            document_name: undefined,
            form_values: [
                {
                    field_seq: undefined,
                    is_mandatory: undefined,
                    field_type: undefined,
                    field_name: undefined,
                    select_values: undefined,
                    document_id: undefined
                },

            ]

        },
        resolver
    });


    const form_values = useFieldArray<any>({
        name: "form_values",
        control
    });

    const options = useMemo(() => {
        const data = Array.isArray(get(getDocuments, "data.data", [])) ? get(getDocuments, "data.data", []) : [];
        return data.map((item: any) => ({label: item.document_name, value: item.id}))
    }, [getDocuments.isSuccess]);


    const onSubmit = handleSubmit((values: any) => {
        let payload = {
            ...values,
            form_values: get(values, "form_values", []).map((item: any) => {
                return {
                    field_seq: item.field_seq,
                    is_mandatory: item.is_mandatory,
                    field_type: item.field_type,
                    field_name: item?.field_name ? item?.field_name : "",
                    document_id: item?.document_id ? item?.document_id : undefined,
                    select_values: item.select_values ? JSON.parse(item.select_values) : []
                }
            })
        };
        documentsSaveMutation.mutateAsync(payload).then((res: AxiosResponse) => {
            navigate('/');
        }).catch((error: AxiosError) => {
            console.log(error)
        });
    });

    return (
        <div className={classes.form_page}>

            <div className={classes.form_box}>
                <Row gutter={[20, 20]} justify={"center"}>
                    <Col span={24}>
                        <Controller
                            name={`document_name`}
                            control={control}
                            render={({field, fieldState}) => (
                                <Input
                                    size={"large"}
                                    label={"Document title"}
                                    {...field}
                                />
                            )}
                        />
                    </Col>
                    <Divider style={{marginBottom: "30px", marginTop: "15px", borderTop: "1px solid #364BA8"}}/>
                    {form_values.fields.map((field: any, index: number) => (
                        <Row gutter={[20, 40]} className={classes.form} key={index}>
                            <Col xs={24}>
                                <Controller
                                    name={`form_values.${index}.field_seq`}
                                    control={control}
                                    render={({field, fieldState}) => (
                                        <Input
                                            label={"Field sequence (weight)"}
                                            type={"number"}
                                            size={"large"}
                                            errorMsg={get(errors, `form_values[${index}].field_seq`, {})}
                                            {...field}
                                        />
                                    )}
                                />
                            </Col>
                            <Col xs={24}>
                                <Controller
                                    name={`form_values.${index}.field_type`}
                                    control={control}
                                    render={({field: {value, onChange}, fieldState}) => (
                                        <Select
                                            label={"Field type"}
                                            size={"large"}
                                            {...field}
                                            style={{width: "100%"}}
                                            options={[
                                                {label: "Input", value: 1},
                                                {label: "Select", value: 2},
                                                {label: "NumberInput", value: 3},
                                            ]}
                                            value={value}
                                            onChange={(event: any) => {
                                                onChange(event);
                                                setValue(`form_values.${index}.select_values`, undefined);
                                                setValue(`form_values.${index}.field_name`, undefined);
                                                setValue(`form_values.${index}.document_id`, undefined);
                                            }}
                                        />
                                    )}
                                />
                            </Col>
                            <Col xs={24}>
                                {watch(`form_values.${index}.field_type`) === 2 ? (
                                    <Controller
                                        name={`form_values.${index}.select_values`}
                                        control={control}
                                        render={({field, fieldState}) => (
                                            <Input
                                                label={"Field name"}
                                                size={"large"}
                                                {...field}
                                                style={{width: "100%"}}

                                            />
                                        )}
                                    />
                                ) : (
                                    <>
                                        {watch(`form_values.${index}.field_type`) === 1 ? (
                                            <Controller
                                                name={`form_values.${index}.field_name`}
                                                control={control}
                                                render={({field, fieldState}) => (
                                                    <Input
                                                        label={"Field name"}
                                                        type={"number"}
                                                        size={"large"}
                                                        errorMsg={get(errors, `form_values[${index}].field_name`, {})}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        ) : (
                                            <Controller
                                                name={`form_values.${index}.document_id`}
                                                control={control}
                                                render={({field, fieldState}) => (
                                                    <Select
                                                        label={"Field name"}
                                                        size={"large"}
                                                        {...field}
                                                        style={{width: "100%"}}
                                                        options={options}
                                                        loading={getDocuments.isLoading}
                                                    />
                                                )}
                                            />
                                        )}
                                    </>
                                )}


                            </Col>
                            <Col xs={24}>
                                <Controller
                                    name={`form_values.${index}.is_mandatory`}
                                    control={control}
                                    render={({field: {value, onChange}, fieldState}) => (
                                        <Checkbox
                                            type={"number"}
                                            checked={value === 1}
                                            onClick={() => {
                                                if (value === 1) {
                                                    onChange(0)
                                                } else {
                                                    onChange(1)
                                                }
                                            }}
                                        >&nbsp;Mandatory</Checkbox>
                                    )}
                                />
                            </Col>
                            <Divider style={{marginBottom: "10px", marginTop: "0px", borderTop: "1px solid #364BA8"}}/>
                        </Row>
                    ))}

                    <Row style={{width: "100%"}} justify={"space-between"}>
                        <Button onClick={() => form_values.append({})}>
                            Add more
                        </Button>
                        <Button type={"primary"} onClick={onSubmit}>
                            Save
                        </Button>
                    </Row>
                </Row>
            </div>
        </div>
    );
};

export default MainForm;