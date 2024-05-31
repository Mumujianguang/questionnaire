import { QRCode } from 'antd'
import styles from './style.module.less'
import ReactDOM from 'react-dom/client'

type Props = {
    value: string
}

/**
 * 二维码组件
 * @param props 
 * @returns 
 */
export function QRCodeComponent(props: Props) {
    return (
        <div className={styles['qr-code-container']}>
            <QRCode value={props.value} />
        </div>
    )
}

/**
 * 二维码模块
 */
export namespace QRCodeModule {
    export type Options = {
        value: string
    }
}

/**
 * 二维码模块
 */
export class QRCodeModule {
    root: HTMLElement
    
    options: QRCodeModule.Options

    #reactRoot: ReactDOM.Root

    constructor(root: string | HTMLElement, options: QRCodeModule.Options) {
        this.root = this.adaptRoot(root)
        this.options = { ...options }

        this.#reactRoot = ReactDOM.createRoot(this.root)
    }

    render() {
        const { value } = this.options

        this.#reactRoot.render(<QRCodeComponent value={value} />);
    }

    adaptRoot(root: string | HTMLElement): HTMLElement {
        const element = typeof root === 'string' ? document.querySelector(root) : root
        return element as HTMLElement
    }

    dispose() {
        this.#reactRoot.unmount()
    }
}