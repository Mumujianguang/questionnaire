import banner from './assets/banner.png';
import background from './assets/background.png';
import './App.css';
import { Button, Form, Input, Radio, Rate, Space } from 'antd';

function App() {


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

    const [form] = Form.useForm();

    return (
        <>
            <img className="background" src={background}></img>
            <div className="home">
                <img className="banner" src={banner}></img>
                <div className="content">
                    <div className="header">
                        <div className="title">智慧蓉城工业与新经济城运分中心演示汇报“打擂台”</div>
                        <div className="tip">感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！</div>
                    </div>

                    <Form
                        layout="vertical"
                        form={form}
                        scrollToFirstError
                        onFinish={(values) => {
                            console.log(values);
                        }}
                    >
                        <Form.Item label="1.您是" name="user" rules={[{ required: true, message: '请选择一个选项' }]}>
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value={1}>局委主要领导</Radio>
                                    <Radio value={2}>局委分管领导</Radio>
                                    <Radio value={3}>各处室或事业单位负责人</Radio>
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
                            rules={[{ required: true, message: '请输入意见建议' }]}
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

export default App;
