/**
 * cn - 值改变回调
 *    -- onChange 属性处理值改变事件（上传成功，删除）
 * en - onChange
 *    -- Set onChange to handle the event of upload successing or delete successing
 */
import React, { Component } from 'react'
import { Upload } from 'shineout'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgList: [
        {
          pictureName: '测试图片',
          pictureUrl: '../images/1_s.jpg',
        },
      ],
    }
  }

  insertImg = (file, data) => {
    const { imgList } = this.state
    this.setState({
      imgList: [
        ...imgList,
        {
          pictureName: file.name,
          pictureUrl: data,
        },
      ],
    })
  }

  deleteImg = data => {
    const { imgList } = this.state
    this.setState({
      imgList: imgList.filter(v => v !== data),
    })
  }

  render() {
    return (
      <div>
        <Upload.Image
          action="//jsonplaceholder.typicode.com/posts"
          name="file"
          limit={6}
          multiple
          style={{ width: 900, marginBottom: '10px' }}
          value={this.state.imgList}
          onSuccess={(res, file, data) => {
            this.insertImg(file, data)
            return { pictureUrl: data }
          }}
          renderResult={d => d.pictureUrl}
          onChange={values => {
            const removeFiles = this.state.imgList.filter(v => values.indexOf(v) < 0)
            if (removeFiles.length) {
              this.deleteImg(removeFiles[0])
            }
          }}
          validator={{
            size: s => (s > 102400 ? new Error('图片大小不能超过10M') : undefined),
          }}
        />
        <div>
          {this.state.imgList.length
            ? this.state.imgList.map((item, index) => (
                <p
                  key={index}
                  style={{
                    display: 'inline-block',
                    width: 80,
                    textAlign: 'center',
                    verticalAlign: 'top',
                    marginRight: 12,
                  }}
                >
                  {item.pictureName ? item.pictureName : '无'}
                </p>
              ))
            : ''}
        </div>
      </div>
    )
  }
}
