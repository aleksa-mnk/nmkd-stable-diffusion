import { useState } from "react"
import { Card, Form, FormGroup, Button } from "react-bootstrap"
import "./GenerateImage.css"
import { ISettings } from "../interfaces/ISettings"

const initValue: ISettings = {
    propmt: '',
    amountOfImages: 1,
    detail: 0,
    creativness: 0,
    seed: -1,
    width: 512,
    height: 512,
    sampler: 'none',
    isSeamlessImages: false,
}
export const GenerateImage = () => {
    const [generatedPhotos, setGeneratedPhotos] = useState<Blob[]>([])
    const [settings, setSettings] = useState<ISettings>(initValue)
    const onSettingChange = (e: any) => {
        const { name, value } = e.target;
        setSettings((prevSettings: any) => ({
            ...prevSettings,
            [name]: value
        }))
    }
    const onSelectSeamlessImages = (e: any) => {
        setSettings((prevSettings: any) => ({
            ...prevSettings,
            isSeamlessImages: !prevSettings.isSeamlessImages
        }))
    }
    const generateImages = () => {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings),
        }
        fetch(process.env.REACT_APP_SERVER_URL + 'generate_image', requestOptions)
            .then(response => response.blob())
            .then(data => {
                setGeneratedPhotos([data])
            })
    }
    return (
        <div className=" d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center me-5">
                <div className="output-image-container">
                    <Card className="output-image">
                        <Card.Body className="d-flex align-items-center justify-content-evenly">
                            {
                                generatedPhotos.length != 0
                                    ?
                                    <img className="w-100 h-100" src={URL.createObjectURL(generatedPhotos[0])} />
                                    :
                                    'Тут появится изображение'
                            }
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div>
                <FormGroup className="d-flex flex-column">
                    <Form.Label>Запрос</Form.Label>
                    <Form.Control name="propmt" type='text' value={settings?.propmt} onChange={onSettingChange} />
                    <Form.Label>Количество картинок для генерации</Form.Label>
                    <Form.Control name="amountOfImages" type='number' min='1' max='5' value={settings?.amountOfImages} onChange={onSettingChange} />
                    <Form.Label>Детали</Form.Label>
                    <Form.Range id="detail" name="detail" min='0' max='100' value={settings?.detail} onChange={onSettingChange} />
                    <output name="resultDetails">{settings?.detail}</output>
                    <Form.Label>Креативность</Form.Label>
                    <Form.Range id="creativness" name="creativness" min='0' max='20' value={settings?.creativness} onChange={onSettingChange} />
                    <output name="resultCreativness">{settings?.creativness}</output>
                    <Form.Label>Сид(-1 рандомный)</Form.Label>
                    <Form.Control name="seed" type='number' min='-1' max='20' value={settings?.seed} onChange={onSettingChange} />
                    <div className="d-flex">
                        <div className="d-flex">
                            <Form.Range id="width" name="width" min='0' max='512' value={settings?.width} onChange={onSettingChange} />
                            <output name="resultResolutioWidth">{settings?.width}</output>
                        </div>
                        <div className="ms-4 me-4">
                            x
                        </div>
                        <div className="d-flex">
                            <Form.Range id="height" name="height" min='0' max='512' value={settings?.height} onChange={onSettingChange} />
                            <output name="resultResolutioHeight">{settings?.height}</output>
                        </div>
                    </div>
                    <Form.Label>Сэмплер</Form.Label>
                    <Form.Select name="sampler" value={settings?.sampler} onChange={onSettingChange}>
                        <option value="k_euler_a" />
                    </Form.Select>
                    <Form.Label>Бесшовные изображения</Form.Label>
                    <Form.Check name="isSeamlessImages" value={String(settings.isSeamlessImages)} onChange={onSelectSeamlessImages} />
                    <Button onClick={generateImages}>Генерация</Button>
                </FormGroup>
            </div>
        </div>
    )
}