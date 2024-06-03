import ReactDOM from 'react-dom/client';
import React from 'react';
import { Button, Form, Input, Radio, Rate, Space } from 'antd';
import CryptoJS from 'crypto-js';
import { flatten, get, set } from 'lodash-es';
import banner from './assets/banner.png';
import './App.css';

export function App() {
    const [form] = Form.useForm();

    // 获取表单name配置
    const getNameConfig = (prefix: string) => {
        return [
            {
                label: '数据汇管',
                name: [prefix, 'dataManagement']
            },
            {
                label: '产业推进',
                name: [prefix, 'industrialPromotion']
            },
            {
                label: '运行调度',
                name: [prefix, 'runSchedule']
            },
            {
                label: '企业服务',
                name: [prefix, 'enterpriseServices']
            },
            {
                label: '能源保障',
                name: [prefix, 'energySecurity']
            },
            {
                label: '安全一张图',
                name: [prefix, 'safetyPicture']
            }
        ];
    };

    // 获取当前服务器时间
    const getCurrentTime = async () => {
        const csrf_key = localStorage.getItem('csrf_key');

        const csrf_val = localStorage.getItem('csrf_val');

        const response = await fetch('/sdcue/ux/api/designer/system/getDate', {
            method: 'GET',
            headers: {
                [csrf_key]: csrf_val
            }
        });

        const { data } = await response.json();

        return data.currentTime;
    };

    // 表单配置
    const config = [
        {
            title: '（1）汇报内容',
            desc: '(是否演示流畅、逻辑清晰、内容完整。分值：20分。)',
            data: getNameConfig('reportContent')
        },
        {
            title: '（2）工作展示',
            desc: '（是否布局合理、清晰明了、高效实用。分值：20分）',
            data: getNameConfig('workDisplay')
        },
        {
            title: '（3）大屏设计',
            desc: '(是否布局合理、清晰明了、高效实用。分值：20分）',
            data: getNameConfig('largeScreenDesign')
        },
        {
            title: '（4）系统数据',
            desc: '（是否具有时效性、精准性、鲜活性。分值：20分',
            data: getNameConfig('systemData')
        },
        {
            title: '（5）系统功能',
            desc: '（是否实战管用，具有监测预警、分析处置、闭环管理等功能。分值：20分）',
            data: getNameConfig('systemFunction')
        }
    ];

    const onFinish = async (values) => {
        const nameList = flatten(config.map((v) => v.data.map((v) => v.name)));
        nameList.forEach((v) => {
            const currentScore = get(values, ['score', ...v]);
            set(values, ['score', ...v], (currentScore || 0) * 4);
        });

        const params = {
            form_role: values.user,
            form_opinion: values.suggestion ?? '',
            scoreInfo: [
                {
                    form_scene: 0, // 数据汇管
                    form_hbnr_score: values.score.reportContent.dataManagement,
                    form_gzzs_score: values.score.workDisplay.dataManagement,
                    form_dpzj_score: values.score.largeScreenDesign.dataManagement,
                    form_xtsj_score: values.score.systemData.dataManagement,
                    form_xtgn_score: values.score.systemFunction.dataManagement
                },
                {
                    form_scene: 1, // 产业推进
                    form_hbnr_score: values.score.reportContent.industrialPromotion,
                    form_gzzs_score: values.score.workDisplay.industrialPromotion,
                    form_dpzj_score: values.score.largeScreenDesign.industrialPromotion,
                    form_xtsj_score: values.score.systemData.industrialPromotion,
                    form_xtgn_score: values.score.systemFunction.industrialPromotion
                },
                {
                    form_scene: 2, // 运行调度
                    form_hbnr_score: values.score.reportContent.runSchedule,
                    form_gzzs_score: values.score.workDisplay.runSchedule,
                    form_dpzj_score: values.score.largeScreenDesign.runSchedule,
                    form_xtsj_score: values.score.systemData.runSchedule,
                    form_xtgn_score: values.score.systemFunction.runSchedule
                },
                {
                    form_scene: 3, // 企业服务
                    form_hbnr_score: values.score.reportContent.enterpriseServices,
                    form_gzzs_score: values.score.workDisplay.enterpriseServices,
                    form_dpzj_score: values.score.largeScreenDesign.enterpriseServices,
                    form_xtsj_score: values.score.systemData.enterpriseServices,
                    form_xtgn_score: values.score.systemFunction.enterpriseServices
                },
                {
                    form_scene: 4, // 能源保障
                    form_hbnr_score: values.score.reportContent.energySecurity,
                    form_gzzs_score: values.score.workDisplay.energySecurity,
                    form_dpzj_score: values.score.largeScreenDesign.energySecurity,
                    form_xtsj_score: values.score.systemData.energySecurity,
                    form_xtgn_score: values.score.systemFunction.energySecurity
                },
                {
                    form_scene: 5, // 安全一张图
                    form_hbnr_score: values.score.reportContent.safetyPicture,
                    form_gzzs_score: values.score.workDisplay.safetyPicture,
                    form_dpzj_score: values.score.largeScreenDesign.safetyPicture,
                    form_xtsj_score: values.score.systemData.safetyPicture,
                    form_xtgn_score: values.score.systemFunction.safetyPicture
                }
            ]
        };

        const appSecret = 'NwBSG1AY';
        const appKey = 'ebmvN5p4BH2duFTe';

        const currentTime = await getCurrentTime();

        const response = await fetch(`${window.SF_PREFIX ?? '/sdcue'}/openapi/model/insert/dcwjpf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                appKey: 'ebmvN5p4BH2duFTe',
                signature: CryptoJS.SHA256(appKey + appSecret + currentTime),
                timestamp: currentTime
            },
            body: JSON.stringify(params)
        });

        const { code, msg = '提交失败' } = await response.json();
        if (code === 200) {
            alert('提交成功');
        } else {
            alert(msg);
        }
    };

    return (
        <>
            <div className="home">
                <img className="banner" src={banner}></img>
                <div className="content">
                    <div className="header">
                        <div className="title">智慧蓉城工业与新经济城运分中心演示汇报“打擂台”</div>
                        <div className="tip">感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！</div>
                    </div>

                    <Form layout="vertical" form={form} scrollToFirstError onFinish={onFinish}>
                        <Form.Item label="1.您是" name="user" rules={[{ required: true, message: '请选择一个选项' }]}>
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value={0}>局委主要领导</Radio>
                                    <Radio value={1}>局委分管领导</Radio>
                                    <Radio value={2}>各处室或事业单位负责人</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            className="formItemRate"
                            name="score"
                            label="2.请给以下各项打分"
                            rules={[
                                {
                                    required: true,
                                    message: ''
                                }
                            ]}
                        >
                            <div>
                                {config.map((v) => (
                                    <div key={v.title}>
                                        <div className="scoreTitle">
                                            <span>{v.title}</span>
                                            <span className="scoreDesc">{v.desc}</span>
                                        </div>

                                        {v.data.map((item) => (
                                            <Form.Item
                                                key={item.name.join('')}
                                                name={['score', ...item.name]}
                                                label={item.label}
                                                rules={[{ required: true, message: '请进行打分' }]}
                                            >
                                                <Rate allowHalf />
                                            </Form.Item>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </Form.Item>
                        <Form.Item
                            name="suggestion"
                            label="意见建议"
                            // rules={[{ required: true, message: '请输入意见建议' }]}
                        >
                            <Input.TextArea placeholder="请输入" rows={3}></Input.TextArea>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default function renderRate(element: HTMLElement) {
    ReactDOM.createRoot(element).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
