var uploadManager = (function(){
  var uploadDatebase = {};

  return {
    add: function(id, uploadType, fileName, fileSize){
      var flyWeightObj = UploadFactory.create(uploadType);

      var dom = document.createElement('div');
      dom.innerHTML = `
        <span>文件名称: ${fileName},  文件大小: ${fileSize}</span>
        <button class="delFile">删除</button>
      `;
      dom.querySelector('.delFile').onclick = function(){
        flyWeightObj.delFile(id);
      };

      document.body.appendChild(dom);

      uploadDatebase[id] = {
        fileName:fileName,
        fileSize: fileSize,
        dom: dom
      };

      return flyWeightObj;
    },
    setExternalState: function(id, flyWeightObj){
      var uploadData = uploadDatebase[id];
      for(var i in uploadData){
        flyWeightObj[i] = uploadData[i];
      }
    }
  }
})();

var Upload = function(uploadType){
  this.uploadType = uploadType;
};

Upload.prototype.delFile = function(id){
  uploadManager.setExternalState(id, this);

  if(this.fileSize < 3000){
    return this.dom.parentNode.removeChild(this.dom);
  }

  if(window.confirm('确定要删除该文件吗？' +this.fileName)){
    return this.dom.parentNode.removeChild(this.dom);
  }
};

var UploadFactory = (function(){
  var createdFlyWeighObjs = {};

  return {
    create: function(uploadType){
      if(createdFlyWeighObjs[uploadType]){
        return createdFlyWeighObjs[uploadType];
      }

      return createdFlyWeighObjs[uploadType] = new Upload(uploadType);
    }
  }
})();

var id = 0;

window.startUpload = function(uploadType, files){
  for(var i = 0, file; file = files[i++];){
    var uploadObj = uploadManager.add( ++ id, uploadType, file.fileName, file.fileSize);
  }
};

startUpload('plugin',[
  {
    fileName:'1.txt',
    fileSize: 1000
  },
  {
    fileName:'2.html',
    fileSize: 3000
  },
  {
    fileName:'3.txt',
    fileSize: 5000
  }
]);

startUpload('flash',[
  {
    fileName:'4.txt',
    fileSize: 1000
  },
  {
    fileName:'5.html',
    fileSize: 3000
  },
  {
    fileName:'6.txt',
    fileSize: 5000
  }
]);

