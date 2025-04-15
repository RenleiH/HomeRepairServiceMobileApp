import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EstimateRequest = () => {
  const navigate = useNavigate();
  const { providerId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [showEstimate, setShowEstimate] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [estimateData, setEstimateData] = useState(null);

  // Mock data for the provider
  const provider = {
    id: providerId,
    name: "John Smith",
    rating: 4.8,
    reviews: 127,
    specialty: "Plumbing",
    hourlyRate: "$75"
  };

  // 模拟预估价格数据
  const mockEstimateData = {
    serviceProvider: {
      name: "John Smith",
      company: "Quick Fix Plumbing",
      rating: 4.8
    },
    estimate: {
      laborCost: 150,
      materialsCost: 200,
      serviceFee: 50,
      tax: 32,
      total: 432,
      currency: "USD",
      timeEstimate: "2-3 hours",
      warranty: "90 days"
    }
  };

  // 添加默认的演示照片
  useEffect(() => {
    // 创建5张默认照片
    const defaultPhotos = Array.from({ length: 5 }, (_, index) => ({
      id: `demo-${index}`,
      url: `https://picsum.photos/400/400?random=${index}`,
      file: null
    }));
    setPhotos(defaultPhotos);
  }, []);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 10) {
      alert('Maximum 10 photos allowed');
      return;
    }
    const newPhotos = files.map(file => ({
      id: Math.random().toString(),
      url: URL.createObjectURL(file),
      file: file
    }));
    setPhotos([...photos, ...newPhotos]);
  };

  const removePhoto = (photoId) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
  };

  const handleRequestEstimate = () => {
    if (photos.length < 5) {
      alert('Please upload at least 5 photos');
      return;
    }
    if (!description.trim()) {
      alert('Please provide a description');
      return;
    }
    // 模拟API调用
    setEstimateData(mockEstimateData);
    setShowEstimate(true);
  };

  const handleAccept = () => {
    setShowConfirmation(true);
  };

  const confirmAccept = () => {
    // 创建新订单并存储到状态中
    const newOrder = {
      id: Math.random().toString(),
      status: 'Waiting for Provider',
      serviceType: provider.specialty,
      provider: provider,
      cost: estimateData.estimate.total,
      createdAt: new Date().toISOString(),
      photos: photos,
      description: description
    };
    
    // 这里可以调用创建订单的API
    // 将新订单添加到全局状态或发送到后端
    localStorage.setItem('newOrder', JSON.stringify(newOrder));
    
    navigate('/active-orders');
  };

  const handleReject = () => {
    navigate('/service-providers/plumbing');
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500"
        >
          ← Back
        </button>
        <h1 className="text-lg font-semibold">Request Estimate</h1>
        <div className="w-10"></div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-20">
        {!showEstimate ? (
          <div className="p-4 space-y-4">
            {/* 照片上传区域 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="font-medium mb-2">Upload Photos (Min: 5, Max: 10)</h2>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {photos.map(photo => (
                  <div key={photo.id} className="relative aspect-square">
                    <img
                      src={photo.url}
                      alt="Upload preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(photo.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {photos.length < 10 && (
                  <label className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer">
                    <span className="text-2xl text-gray-400">+</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {photos.length}/10 photos uploaded
              </p>
            </div>

            {/* 描述输入区域 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="font-medium mb-2">Describe the Issue</h2>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide detailed information about the issue..."
                className="w-full h-32 p-3 border rounded-lg text-sm"
              />
            </div>

            {/* 请求预估按钮 */}
            <button
              onClick={handleRequestEstimate}
              disabled={photos.length < 5 || !description.trim()}
              className={`w-full py-3 rounded-lg ${
                photos.length < 5 || !description.trim()
                  ? 'bg-gray-300 text-gray-500'
                  : 'bg-blue-500 text-white'
              }`}
            >
              Request Estimate
            </button>
          </div>
        ) : (
          <div className="p-4">
            {/* 预估价格清单 */}
            <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  👨‍🔧
                </div>
                <div>
                  <h3 className="font-medium">{estimateData.serviceProvider.name}</h3>
                  <p className="text-sm text-gray-600">{estimateData.serviceProvider.company}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Labor</span>
                  <span>${estimateData.estimate.laborCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Materials</span>
                  <span>${estimateData.estimate.materialsCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span>${estimateData.estimate.serviceFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${estimateData.estimate.tax}</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-medium">
                  <span>Total Estimate</span>
                  <span>${estimateData.estimate.total}</span>
                </div>
              </div>

              <div className="pt-2 border-t space-y-1">
                <p className="text-sm text-gray-600">
                  Estimated Time: {estimateData.estimate.timeEstimate}
                </p>
                <p className="text-sm text-gray-600">
                  Warranty: {estimateData.estimate.warranty}
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleReject}
                  className="flex-1 py-2 border border-gray-300 rounded-lg"
                >
                  Reject
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 固定的返回按钮 */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="bg-white text-blue-500 px-4 py-2 rounded-full shadow-lg flex items-center space-x-1 hover:bg-blue-50 active:transform active:scale-95 transition-all border border-gray-100"
        >
          <span>←</span>
          <span>Back</span>
        </button>
      </div>

      {/* 确认弹窗 */}
      {showConfirmation && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 mx-4 w-full max-w-[300px]">
            <h3 className="text-lg font-semibold mb-2">Confirm Order</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to proceed with this order?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmAccept}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstimateRequest; 