abstract class Upload {
    abstract saveFile(file: File): void
    abstract newFileName: string

    progress() {
        console.log(`X% uploding (${this.newFileName})`)
    }
}

class UploadAWS extends Upload {
    saveFile(file: File): void {
        console.log("File uploaded", file.name)
    }
    newFileName: string
}

const upload = new UploadAWS()

const file = new File(["contenido"], "contenido.txt", {type: "text/plain"} )
upload.saveFile(file)
upload.progress()