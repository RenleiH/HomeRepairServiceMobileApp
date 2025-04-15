// 使用 localStorage 作为临时数据库
class Database {
  constructor() {
    // 从 localStorage 加载数据，如果没有则初始化
    const savedUsers = localStorage.getItem('users');
    const savedFeedback = localStorage.getItem('feedback');
    
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    } else {
      // 初始化新的数据结构
      this.users = {
        homeowners: [],
        serviceProviders: []
      };
      
      // 添加一个测试用户
      this.users.homeowners.push({
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'demo123',
        avatar: null,
        memberSince: 'Jan 2024',
        totalOrders: 7,
        accountStatus: 'active'
      });
      
      this.saveUsers();
    }

    if (savedFeedback) {
      this.feedback = JSON.parse(savedFeedback);
    } else {
      this.feedback = [];
      this.saveFeedback();
    }
  }

  // 保存用户数据到 localStorage
  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  // 保存反馈数据到 localStorage
  saveFeedback() {
    localStorage.setItem('feedback', JSON.stringify(this.feedback));
  }

  // 注册新用户
  registerUser(userType, userData) {
    const collection = userType === 'homeowner' ? 'homeowners' : 'serviceProviders';
    const existingUser = this.users[collection].find(user => user.email === userData.email);
    
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = {
      ...userData,
      id: Date.now().toString(),
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      totalOrders: 0,
      accountStatus: 'active'
    };

    this.users[collection].push(newUser);
    this.saveUsers();
    return newUser;
  }

  // 用户登录
  loginUser(userType, email, password) {
    const collection = userType === 'homeowner' ? 'homeowners' : 'serviceProviders';
    const user = this.users[collection].find(
      user => user.email === email && user.password === password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  // 获取用户信息
  getUser(userType, userId) {
    const collection = userType === 'homeowner' ? 'homeowners' : 'serviceProviders';
    return this.users[collection].find(user => user.id === userId);
  }

  // 更新用户信息
  updateUser(userType, userId, userData) {
    const collection = userType === 'homeowner' ? 'homeowners' : 'serviceProviders';
    const userIndex = this.users[collection].findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    this.users[collection][userIndex] = {
      ...this.users[collection][userIndex],
      ...userData
    };
    
    this.saveUsers();
    return this.users[collection][userIndex];
  }

  // 添加反馈
  addFeedback(feedbackData) {
    const newFeedback = {
      ...feedbackData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    this.feedback.push(newFeedback);
    this.saveFeedback();
    return newFeedback;
  }

  // 获取用户的所有反馈
  getUserFeedback(userType, userId) {
    return this.feedback.filter(
      feedback => feedback.userType === userType && feedback.userId === userId
    );
  }

  // 获取所有反馈
  getAllFeedback() {
    return this.feedback;
  }
}

export const db = new Database(); 