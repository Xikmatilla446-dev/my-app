import React, {useMemo} from 'react';
import {Controller, useForm} from "react-hook-form";

import {object, string, array, number} from "yup";
import useYupValidationResolver from "hooks/queries/custom/useYupValidationResolver";

const MainForm = () => {

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
                    select_values: [
                        {
                            value: true,
                            label: "Agree"
                        },
                        {
                            value: false,
                            label: "Disagree"
                        }
                    ]
                },

            ]

        },
        resolver
    });
    return (
        <div >

        </div>
    );
};

export default MainForm;