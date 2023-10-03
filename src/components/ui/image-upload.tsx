"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import {CldUploadWidget} from "next-cloudinary";

interface ImageUploadProps {
    disabled?: boolean;
    onChange?: (value: File) => void;
    onRemove?: (value: string) => void;
    value: string[  ]
}

const ImageUpload: React.FC<ImageUploadProps> = (
    {
        disabled,
        onChange,
        onRemove,
        value,
    }
) => {
    //Mounting trick to prevent hydration errors
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])
    
    const onUpload = (result: any) => {
        if (onChange) {
            onChange(result.info.secure_url)
        }
    }
    
    if (!isMounted) return null


    return(
        <div> 
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                        <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                            <div className="z-10 absolute top-2 right-2">
                                <Button 
                                    type="button"
                                    onClick={() => {
                                        if (onRemove){
                                            onRemove(url)
                                        }
                                    }}
                                    variant="destructive"
                                    size="icon"
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            {/* When using hosting services for Image from next/image, you should always include the url in the next.config.js */}
                            <Image 
                                fill
                                className="object-cover"
                                alt="Image"
                                src={url}
                            />
                        </div>
                    ))}
            </div>
            <CldUploadWidget
                onUpload={onUpload}
                //Info from cloudinary, make sure signing mode is "unsigned"
                uploadPreset="isuq8yhq"
            >
                {({open, widget}) => {
                    const onClick = () => {
                        open()
                    }

                    const onUpload = (error: any, results: any) => {
                        // handle upload results
                    }

                    return (
                        <>
                            <Button 
                                type="button"
                                disabled={disabled}
                                variant="secondary"
                                onClick={onClick}
                            >
                                <ImagePlus className="h-4 w-4 mr-2"/>
                                Upload an Image
                            </Button>
                            <input type="file" ref={widget} style={{display: 'none'}} onChange={() => {}} />
                        </>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload