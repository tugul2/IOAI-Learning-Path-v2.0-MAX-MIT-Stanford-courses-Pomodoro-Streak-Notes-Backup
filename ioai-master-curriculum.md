# IOAI Master Curriculum — Beginner to Master Level
## Every Subject, Every Skill, Every Video

> This is your complete, maximum-detail learning curriculum. Every subject is broken into **Beginner → Intermediate → Advanced → Master** levels, each with explanations of what to learn, what it means deeply, projects to build, and the best free video resources linked for that exact level.

---

## HOW TO USE THIS DOCUMENT

1. Start at **Beginner** for each subject — do not skip even if you think you know it. Build solid foundations first.
2. Only move to the next level when you can **teach the previous level** back to someone else and implement it from scratch.
3. Watch videos ACTIVELY: pause, code along, close the video and rebuild without it.
4. Every level ends with a **mini-project checkpoint** — do not skip these.
5. This document is a living checklist. Mark ✅ as you complete each section.

---

## SUBJECT 1: MATHEMATICS FOR AI

### 📐 1.1 Linear Algebra

---

#### BEGINNER — Vectors, Matrices, Basic Operations

**What to learn and what it actually means:**

- A **vector** is a list of numbers (e.g., `[2, 5, 1]`) that can represent anything: a point in space, pixel values, or a feature set. Every data row in ML is a vector.
- A **matrix** is a 2D grid of numbers. When you have 1000 data samples with 10 features each, your data is a 1000×10 matrix.
- **Matrix multiplication**: if matrix A is `m×k` and B is `k×n`, then `AB` is `m×n`. The key rule: inner dimensions must match. This is how linear layers in neural networks work — a forward pass is literally `output = W @ x + b`.
- **Transpose**: flip rows and columns. `A.T` in NumPy. Used constantly in dot products and gradient computations.
- **Dot product**: measures similarity between two vectors. The cosine similarity used in NLP is a normalized dot product.
- **Norms**: `||v||` is the length of a vector. L2 norm = Euclidean distance. L1 norm = sum of absolute values. Both appear in regularization (L1/L2 reg in ML).

**Projects at this level:**
- Implement matrix multiplication from scratch (nested Python loops, then NumPy vectorized).
- Compute cosine similarity between two word vectors manually.
- Represent a tiny 3-sample dataset as a matrix and multiply it by a weight vector.

**Videos:**
- 🎬 **3Blue1Brown — Essence of Linear Algebra (Chapters 1–5)**: The single best visual introduction to vectors, linear transformations, matrix multiplication, and determinants. Geometric intuition is everything here.
  - https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab
- 🎬 **3Blue1Brown — Vectors Ch.1**: `https://www.youtube.com/watch?v=fNk_zzaMoSs`
- 🎬 **3Blue1Brown — Linear Transformations Ch.3**: `https://www.youtube.com/watch?v=kYB8IZa5AuE`

---

#### INTERMEDIATE — Eigenvalues, SVD, Projections, PCA

**What to learn and what it actually means:**

- **Eigenvectors/Eigenvalues**: An eigenvector of a matrix A is a special direction that A only stretches (doesn't rotate). `Av = λv`. In PCA, eigenvectors of the covariance matrix are the "principal directions" — the axes along which your data varies the most.
- **Principal Component Analysis (PCA)**: Compresses high-dimensional data to fewer dimensions while keeping maximum variance. Steps: (1) center data, (2) compute covariance matrix, (3) eigendecompose it, (4) project data onto top-k eigenvectors.
- **SVD (Singular Value Decomposition)**: Every matrix `A = UΣV^T`. U and V are rotation matrices; Σ is a diagonal scaling matrix. Used in recommendation systems, image compression, and understanding linear models.
- **Projections**: Projecting vector `b` onto vector `a` gives the component of `b` in the direction of `a`. This is the geometry behind least-squares regression.
- **Rank, null space**: Rank = number of linearly independent rows/columns. The null space contains vectors that A maps to zero — important for understanding underdetermined systems.

**Projects at this level:**
- Implement PCA from scratch using NumPy eigendecomposition on MNIST or Iris. Visualize 2D projection.
- Implement low-rank matrix approximation with SVD and show image compression effect.
- Plot eigenvectors of a 2×2 covariance matrix on top of a 2D scatter plot.

**Videos:**
- 🎬 **3Blue1Brown — Eigenvectors & Eigenvalues Ch.14**: `https://www.youtube.com/watch?v=PFDu9oVAE-g`
- 🎬 **3Blue1Brown — Dot Products Ch.9**: `https://www.youtube.com/watch?v=LyGKycYT2v0`
- 🎬 **StatQuest — PCA Step-by-Step**: `https://www.youtube.com/watch?v=FgakZw6K1QQ`

---

#### ADVANCED — Matrix Calculus, Conditioning, Gram-Schmidt

**What to learn and what it actually means:**

- **Matrix calculus**: Compute `∂L/∂W` when L is a scalar loss and W is a weight matrix. The result has the same shape as W. This is gradient descent for neural networks.
- **Jacobians and Hessians**: The Jacobian generalizes gradients to vector outputs. The Hessian is the matrix of second derivatives — tells you the curvature of the loss. Saddle points (where Hessian has both positive and negative eigenvalues) are why deep net training is hard.
- **Condition number**: Ratio of largest to smallest singular value of a matrix. High condition number = numerically unstable. Explains why certain problems are hard to optimize and why weight initialization matters.
- **Gram-Schmidt orthogonalization**: Converts any basis into an orthonormal basis. Foundation of QR decomposition. Conceptually important for understanding why batch norm works.

**Projects at this level:**
- Derive gradient of `L = ||Xw - y||^2` with respect to `w` analytically and verify numerically with finite differences.
- Build a mini autograd that tracks gradient flow through matrix multiply and softmax.

**Videos:**
- 🎬 **MIT 18.065 Matrix Methods (Gilbert Strang)** — advanced linear algebra for data science: `https://www.youtube.com/playlist?list=PLUl4u3cNGP63oMNUHXqIUcrkS2PivhN3k`
- 🎬 **Stanford CS229 — Linear Algebra Review (Lecture notes supplement)**: `https://cs229.stanford.edu/section/cs229-linalg.pdf`

---

#### MASTER — Spectral Methods, Tensor Algebra, Structured Matrices

**What to learn and what it actually means:**

- **Spectral graph theory**: Eigenvalues of a graph's Laplacian capture its structure (connectedness, clustering). Basis of Graph Neural Networks (GNNs).
- **Tensor operations**: Generalization of matrices to 3+ dimensions. All deep learning computations are tensor ops (batch × channels × height × width in CNNs). Understanding Einstein summation (`einsum`) makes complex attention computations readable.
- **Low-rank approximations in attention**: Modern efficient transformers use low-rank attention approximations (Linformer, Performer). Understanding why requires SVD and spectral analysis.

**Projects at this level:**
- Rewrite multi-head self-attention using `torch.einsum` and compare to the naive loop implementation.
- Apply spectral clustering to a network dataset and compare against K-means.

---

### 📊 1.2 Probability and Statistics

---

#### BEGINNER — Random Variables, Distributions, Expectation

**What to learn and what it actually means:**

- A **random variable** is a variable whose value is determined by a random process. `X ~ Normal(0, 1)` means X is drawn from a Gaussian distribution.
- **Probability mass function (PMF)** for discrete variables: `P(X=k)`. **Probability density function (PDF)** for continuous: `f(x)`, where probabilities come from integrals.
- **Expectation E[X]**: the average value. For a die, E[X] = 3.5. In ML, expected loss = average loss over the data distribution.
- **Variance Var(X)**: how spread out values are. Standard deviation = sqrt(variance). L2 regularization penalizes weight variance.
- **Key distributions to know**: Bernoulli (one binary trial), Binomial (k successes in n trials), Gaussian/Normal (symmetric bell curve, everywhere in statistics), Uniform (equal probability over range), Poisson (counts of rare events).

**Projects at this level:**
- Simulate coin flips and estimate P(heads) with increasing samples. Plot convergence to 0.5 (Law of Large Numbers).
- Plot PMF/PDF of Bernoulli, Binomial, Normal, and Poisson using matplotlib.

**Videos:**
- 🎬 **StatQuest — Probability Basics**: `https://www.youtube.com/watch?v=uzkc-qNVoOk`
- 🎬 **StatQuest — Normal Distribution**: `https://www.youtube.com/watch?v=rzFX5NWojp0`
- 🎬 **StatQuest — Probability vs Likelihood**: `https://www.youtube.com/watch?v=pYxNSUDSFH4`

---

#### INTERMEDIATE — Bayes, Joint/Conditional Distributions, Entropy

**What to learn and what it actually means:**

- **Bayes' Theorem**: `P(A|B) = P(B|A)P(A) / P(B)`. This is the foundation of Bayesian ML. In classification: `P(class|data) ∝ P(data|class) * P(class)`.
- **Joint and conditional distributions**: `P(X, Y)` is the joint; `P(X|Y)` is conditional. Independent variables: `P(X, Y) = P(X)P(Y)`.
- **Maximum Likelihood Estimation (MLE)**: Find parameters θ that maximize `P(data | θ)`. Logistic regression training IS maximum likelihood.
- **Entropy**: `H(X) = -Σ P(x) log P(x)`. Measures randomness/uncertainty. High entropy = very uncertain. Used in decision trees (information gain = entropy reduction).
- **Cross-entropy**: `H(p, q) = -Σ p(x) log q(x)`. The standard classification loss. Minimizing cross-entropy = making your model's distribution `q` match the true distribution `p`.
- **KL Divergence**: `KL(p||q) = Σ p log(p/q)`. Measures how much `q` diverges from `p`. Used in VAEs, reinforcement learning, knowledge distillation.

**Projects at this level:**
- Build a Naive Bayes text classifier from scratch for spam detection.
- Derive cross-entropy loss from MLE for logistic regression.
- Compute entropy of a decision tree split and find the best split for a toy dataset.

**Videos:**
- 🎬 **StatQuest — Bayes Theorem**: `https://www.youtube.com/watch?v=9wCnvr7Xw4E`
- 🎬 **StatQuest — Maximum Likelihood Estimation**: `https://www.youtube.com/watch?v=XepXtl9YKwc`
- 🎬 **3Blue1Brown — Bayes Theorem (visual)**: `https://www.youtube.com/watch?v=HZGCoVF3YvM`

---

#### ADVANCED — Concentration Inequalities, Generalization Bounds

**What to learn and what it actually means:**

- **Law of Large Numbers**: Sample mean converges to true mean as n → ∞. This is why training on more data helps.
- **Central Limit Theorem**: Sum of iid random variables approaches a Gaussian. Explains why many natural phenomena are Gaussian and why Gaussian noise is a good default assumption.
- **Hoeffding's inequality**: Bounds the probability that a sample mean deviates far from its true mean. Provides theoretical justification for train/validation splits.
- **Bias-variance decomposition**: Expected error = Bias² + Variance + Noise. High bias = underfitting. High variance = overfitting. Every regularization technique is a bias-variance trade-off.

**Projects at this level:**
- Empirically demonstrate the bias-variance trade-off by plotting training/validation error vs polynomial degree for regression.
- Plot CLT convergence: show that averages of uniform random variables become Gaussian.

**Videos:**
- 🎬 **StatQuest — Bias-Variance Tradeoff**: `https://www.youtube.com/watch?v=EuBBz3bI-aA`
- 🎬 **MIT 6.S191 — Foundations (probability and uncertainty)**: `https://www.youtube.com/watch?v=II4giR4vOOo`

---

### ∇ 1.3 Calculus and Optimization

---

#### BEGINNER — Derivatives, Chain Rule, Partial Derivatives

**What to learn and what it actually means:**

- **Derivative** `f'(x)` = slope of f at x. In ML, it tells us how much a loss changes when we change a parameter.
- **Chain rule**: `d/dx f(g(x)) = f'(g(x)) · g'(x)`. This is exactly what backpropagation computes — it applies the chain rule through every layer of the network.
- **Partial derivatives**: When f depends on multiple variables (weights), `∂f/∂w_i` is how f changes w.r.t. one weight. The gradient `∇f` stacks all partial derivatives.
- **Gradient = direction of steepest ascent**. Gradient descent subtracts a fraction of the gradient: `w ← w - α∇L`.

**Projects at this level:**
- Compute gradient of `L = (wx - y)²` by hand, then verify with NumPy finite differences.
- Implement gradient descent on a 1D loss curve and visualize the path.

**Videos:**
- 🎬 **3Blue1Brown — Essence of Calculus (full playlist)**: `https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr`
- 🎬 **3Blue1Brown — What is a derivative?**: `https://www.youtube.com/watch?v=9vKqVkMQHKk`
- 🎬 **3Blue1Brown — Chain Rule**: `https://www.youtube.com/watch?v=YG15m2VwSjA`

---

#### INTERMEDIATE — Backpropagation, Gradient Descent Variants

**What to learn and what it actually means:**

- **Backpropagation**: Efficient algorithm to compute `∂L/∂w` for ALL weights using the chain rule in one backward pass. The key insight: compute gradients from output to input (backwards), reusing intermediate computations.
- **SGD**: Update weights using gradient from one (or a mini-batch of) sample(s). Noisy but fast and generalizes better.
- **Momentum**: Adds a "velocity" term so gradient updates have inertia. Helps escape local minima and speeds up convergence.
- **Adam/AdamW**: Combines momentum with adaptive per-parameter learning rates. Currently the most common optimizer in practice. AdamW adds decoupled weight decay (better than L2 reg with Adam).
- **Learning rate schedules**: Warmup (gradually increase lr at start), cosine annealing (gradually decrease), step decay. Getting these right is crucial for Transformer training.

**Projects at this level:**
- Implement backprop manually for a 2-layer MLP (no PyTorch autograd) on XOR problem.
- Compare SGD, SGD+Momentum, and Adam on a toy regression problem — plot loss curves.
- Implement learning rate warmup + cosine decay and apply it to MLP on MNIST.

**Videos:**
- 🎬 **3Blue1Brown — Backpropagation (visual)**: `https://www.youtube.com/watch?v=Ilg3gGewQ5U`
- 🎬 **3Blue1Brown — Backpropagation Calculus**: `https://www.youtube.com/watch?v=tIeHLnjs5U8`
- 🎬 **Andrej Karpathy — micrograd (build backprop from scratch)**: `https://www.youtube.com/watch?v=VMj-3S1tku0` (2h25m deep dive — essential)

---

#### ADVANCED — Convex Optimization, Second-Order Methods, Loss Landscapes

**What to learn and what it actually means:**

- **Convex functions**: A function where the line segment between any two points lies above the curve. Convex optimization = guaranteed global minimum. Linear/logistic regression losses are convex. Neural nets are NOT convex.
- **Hessian and curvature**: Positive definite Hessian → local minimum. Indefinite Hessian → saddle point. Most "local minima" in deep nets are actually saddle points — gradient descent escapes them via noise.
- **Loss landscape visualization**: Deep nets have complex loss surfaces. Flatter minima generalize better (why batch size and learning rate affect generalization, not just speed).

**Videos:**
- 🎬 **Stanford CS229 Lecture 2 — Linear Regression, Gradient Descent**: `https://www.youtube.com/watch?v=4b4MUYve_U8`
- 🎬 **MIT 6.S191 — Deep Learning Optimization**: `https://www.youtube.com/watch?v=II4giR4vOOo`

---

## SUBJECT 2: PYTHON & PROGRAMMING TOOLS

### 🐍 2.1 Core Python

---

#### BEGINNER — Syntax, Functions, Data Structures

**What to learn:**
- Variables, types (int, float, str, bool, list, dict, tuple, set).
- Control flow: `if/elif/else`, `for` loops, `while`.
- Functions: `def`, arguments, return values, default arguments.
- List/dict/set comprehensions: `[x**2 for x in range(10) if x % 2 == 0]`.
- File I/O: reading/writing CSV and JSON.
- Error handling: `try/except/finally`.

**Projects at this level:**
- Build a CSV reader that loads a dataset and prints basic statistics (mean, min, max).
- Write a function that tokenizes a string into words and counts word frequencies.

**Videos:**
- 🎬 **CS50 Introduction to AI with Python — Full Course**: `https://www.youtube.com/watch?v=5NgNicANyqM` (Harvard, free, excellent)
- 🎬 **Sentdex — Practical ML with Python**: `https://www.youtube.com/watch?v=OGxgnH8y2NM`

---

#### INTERMEDIATE — OOP, Generators, NumPy, Pandas

**What to learn:**
- Classes and OOP: `__init__`, `__repr__`, inheritance, `@property`, `@staticmethod`.
- Iterators and generators: `yield`, lazy evaluation for large datasets.
- Decorators: `@functools.lru_cache`, custom decorators.
- NumPy: array creation, broadcasting, advanced indexing, `np.einsum`.
- Pandas: DataFrame creation, indexing (`.loc`, `.iloc`), `groupby`, `merge`, `pivot_table`, handling missing values, datetime index.

**Projects at this level:**
- Implement K-means clustering using only NumPy (no scikit-learn).
- Use Pandas to clean a messy real-world CSV dataset (missing values, duplicates, type casting, filtering).
- Build a `Dataset` class in Python that supports batching and shuffling.

**Videos:**
- 🎬 **StatQuest — Statistics Fundamentals Playlist**: `https://www.youtube.com/watch?v=qBigTkBLU6g&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9`
- 🎬 **Sentdex — NumPy and Pandas tutorials**: `https://www.youtube.com/@sentdex`

---

#### ADVANCED — PyTorch Custom Modules, Efficient Pipelines

**What to learn:**
- Custom `nn.Module`: `__init__` for layers, `forward()` for computation graph.
- Custom `Dataset` and `DataLoader` with proper collation, augmentation, and multiprocessing.
- Training loop from scratch: optimizer step, gradient zeroing, loss backward, metric tracking, checkpointing.
- Profiling and debugging: finding bottlenecks, checking for NaN gradients, hook-based debugging.

**Projects at this level:**
- Implement a complete training pipeline in PyTorch for CIFAR-10 with: custom Dataset, DataLoader, ResNet-18 fine-tuning, cosine LR schedule, and checkpointing.
- Implement gradient clipping and experiment with its effect on training stability.

**Videos:**
- 🎬 **Andrej Karpathy — Neural Networks Zero to Hero (full playlist)**: `https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ`
  - Video 1: micrograd (backprop from scratch)
  - Video 2–5: building language models, MLPs, batch norm, backprop ninja
  - Video 7: GPT from scratch
- 🎬 **Sentdex — PyTorch Deep Learning series**: `https://www.youtube.com/watch?v=BzcBsTou0C0`

---

## SUBJECT 3: CLASSICAL MACHINE LEARNING

### 🤖 3.1 Supervised Learning

---

#### BEGINNER — Linear & Logistic Regression

**What to learn and what it means deeply:**

- **Linear regression**: Fit a line `y = wx + b` to data by minimizing MSE. The closed-form solution is `w = (X^T X)^{-1} X^T y`. Gradient descent converges to the same solution.
- **Logistic regression**: Predicts probabilities using sigmoid function `σ(z) = 1/(1+e^{-z})`. Output is between 0 and 1. Loss = binary cross-entropy. NOT actually a regression model — it's a linear classifier.
- **Regularization**: L2 (Ridge) = add `λ||w||²` to loss, shrinks weights toward zero. L1 (Lasso) = add `λ||w||₁`, creates sparsity (sets some weights exactly to zero). L2 is smooth and differentiable everywhere; L1 is not.
- **Feature scaling**: Always standardize features (zero mean, unit variance) before linear models. Otherwise large-magnitude features dominate.

**Projects:**
- Implement linear regression from scratch with gradient descent. Plot predicted vs actual.
- Implement logistic regression for binary classification. Plot decision boundary on 2D data.

**Videos:**
- 🎬 **StatQuest — Linear Regression**: `https://www.youtube.com/watch?v=nk2CQITm_eo`
- 🎬 **StatQuest — Logistic Regression**: `https://www.youtube.com/watch?v=yIYKR4sgzI8`
- 🎬 **Stanford CS229 Lecture 1 — Supervised Learning Intro**: `https://www.youtube.com/watch?v=jGwO_UgTS7I`

---

#### INTERMEDIATE — Trees, Ensembles, SVMs

**What to learn and what it means deeply:**

- **Decision Trees**: Greedily split data on features to minimize entropy (classification) or MSE (regression). Prone to overfitting if deep. Hyperparameters: max_depth, min_samples_leaf.
- **Random Forests**: Ensemble of trees, each trained on a random bootstrap sample with a random feature subset. Reduces variance through averaging. Largely hyperparameter-robust.
- **Gradient Boosting (XGBoost, LightGBM, CatBoost)**: Builds trees sequentially, each one correcting the residuals of the previous. Usually the strongest tabular ML algorithm. Key hyperparameters: n_estimators, learning_rate, max_depth, subsample, colsample_bytree.
- **Support Vector Machines**: Find the maximum-margin hyperplane. With kernel trick, can find non-linear boundaries. RBF kernel is most common. Hyperparameters: C (regularization), γ (RBF width).
- **K-Nearest Neighbors**: Classify by majority vote of k nearest training examples. No training phase — all computation at inference. Sensitive to scale and high dimensions.

**Projects:**
- Train and compare Random Forest vs XGBoost vs LightGBM on a Kaggle tabular dataset. Log all metrics.
- Visualize SVM decision boundary with different kernels (linear, RBF, poly) on 2D synthetic data.
- Visualize a decision tree using `sklearn.tree.plot_tree`.

**Videos:**
- 🎬 **StatQuest — Decision Trees**: `https://www.youtube.com/watch?v=7VeUPuFGJHk`
- 🎬 **StatQuest — Random Forests**: `https://www.youtube.com/watch?v=J4Wdy0Wc_xQ`
- 🎬 **StatQuest — Gradient Boost**: `https://www.youtube.com/watch?v=3CC4N4z3GJc`
- 🎬 **StatQuest — XGBoost**: `https://www.youtube.com/watch?v=OtD8wVaFm6E`
- 🎬 **Stanford CS229 — SVMs (Lecture 6)**: `https://www.youtube.com/watch?v=lDwow4aOrtg`

---

#### ADVANCED — Feature Engineering, Pipelines, Calibration

**What to learn:**
- Feature engineering: polynomial features, interaction terms, log/sqrt transforms, target encoding.
- Handling imbalanced data: SMOTE, class_weight='balanced', threshold tuning, stratified sampling.
- Model calibration: Platt scaling, isotonic regression. Plot reliability curves (calibration curves).
- Scikit-learn `Pipeline` + `ColumnTransformer` for clean preprocessing-in-pipeline.
- Optuna/hyperparameter tuning: Bayesian optimization for efficient search.

**Projects:**
- Build a complete production-style sklearn pipeline: preprocessing + model + CV + metric reporting.
- Implement target encoding from scratch and compare to one-hot on a categorical dataset.

**Videos:**
- 🎬 **StatQuest — Cross Validation**: `https://www.youtube.com/watch?v=fSytzGwwBVw`
- 🎬 **StatQuest — Machine Learning Full Playlist**: `https://statquest.org/video_index.html`

---

### 📉 3.2 Unsupervised Learning

---

#### BEGINNER — K-Means, PCA

**What to learn:**
- **K-Means**: Iteratively assign points to nearest centroid, then update centroids. Initialize with k-means++. Sensitive to outliers. Choose k via elbow method or silhouette score.
- **PCA**: Reduces dimensions by projecting onto top eigenvectors of covariance matrix. Use for visualization, noise removal, and speeding up downstream models.

**Videos:**
- 🎬 **StatQuest — K-Means Clustering**: `https://www.youtube.com/watch?v=4b5d3muPQmA`
- 🎬 **StatQuest — PCA Step-by-Step**: `https://www.youtube.com/watch?v=FgakZw6K1QQ`

---

#### INTERMEDIATE — DBSCAN, Hierarchical, GMMs, t-SNE/UMAP

**What to learn:**
- **DBSCAN**: Density-based clustering. Can find non-convex clusters and identifies outliers (noise points). No need to specify k. Parameters: `eps`, `min_samples`.
- **Hierarchical clustering**: Builds a dendrogram by iteratively merging/splitting clusters. Agglomerative (bottom-up) is most common.
- **Gaussian Mixture Models (GMM)**: Probabilistic generalization of K-means. Assigns soft cluster memberships. Trained with EM algorithm.
- **t-SNE and UMAP**: Non-linear dimensionality reduction for visualization. t-SNE preserves local structure; UMAP is faster and also preserves global structure better. NEVER use for quantitative analysis — only visualization.

**Videos:**
- 🎬 **StatQuest — DBSCAN**: `https://www.youtube.com/watch?v=RDZUdRSDOok`
- 🎬 **StatQuest — Hierarchical Clustering**: `https://www.youtube.com/watch?v=7xHsRkOdVwo`
- 🎬 **StatQuest — t-SNE**: `https://www.youtube.com/watch?v=NEaUSP4YerM`

---

## SUBJECT 4: DEEP LEARNING

### 🧠 4.1 Neural Networks from Zero

---

#### BEGINNER — Perceptrons, Activations, Forward Pass

**What to learn and what it means deeply:**

- **Perceptron**: Takes weighted sum of inputs + bias, passes through a threshold. The simplest classifier. Cannot solve XOR — needs hidden layers.
- **Activation functions**: Non-linearities that let networks learn complex functions. Without them, stacking linear layers = still just one linear layer.
  - **ReLU**: `max(0, x)`. Fast, no vanishing gradient for positive inputs. Can "die" if gradients are always negative. Most common.
  - **Sigmoid**: `1/(1+e^{-x})`. Squashes to [0,1]. Saturates at extremes → vanishing gradients in deep nets.
  - **Tanh**: `(e^x - e^{-x})/(e^x + e^{-x})`. Range [-1, 1]. Better than sigmoid for hidden layers.
  - **GELU, SiLU**: Smooth versions of ReLU used in modern Transformers (GELU in BERT, SiLU in LLaMA).
- **Forward pass**: Data flows from input → hidden layers → output. Each layer: `h = activation(Wh_{prev} + b)`.
- **Loss functions**: MSE for regression, Cross-Entropy for classification. Cross-entropy with softmax output = multinomial logistic regression.

**Projects:**
- Implement a 2-layer MLP forward pass using only NumPy. No autograd.
- Train on XOR: show that 1 hidden layer with ReLU can solve it.

**Videos:**
- 🎬 **3Blue1Brown — But what is a Neural Network? (Ch.1)**: `https://www.youtube.com/watch?v=aircAruvnKk`
- 🎬 **3Blue1Brown — Gradient Descent, Neural Net Training (Ch.2)**: `https://www.youtube.com/watch?v=IHZwWFHWa-w`
- 🎬 **MIT 6.S191 (2026) — Lecture 1: Deep Learning Foundations**: `https://www.youtube.com/watch?v=II4giR4vOOo`

---

#### INTERMEDIATE — Full Training Loop, Regularization, Batch Norm

**What to learn:**
- **Mini-batch training**: Shuffle data, split into batches, compute gradient on each batch, update weights. Epoch = one full pass through data.
- **Dropout**: Randomly zero out activations during training (p=0.1–0.5). Forces network to learn redundant representations. Disable during inference with `model.eval()`.
- **Batch Normalization**: Normalizes layer inputs to zero mean, unit variance (per-batch statistics during training; running stats during eval). Dramatically stabilizes and speeds up training. Essential in CNNs.
- **Weight initialization**: Random but careful. Xavier/Glorot (sigmoid/tanh), Kaiming/He (ReLU). Bad init → vanishing or exploding gradients from step 1.
- **Gradient clipping**: Cap gradients at a max norm to prevent explosive updates. Essential for RNNs and recommended for Transformers.
- **Early stopping**: Stop training when validation loss stops improving. Best model = checkpoint at lowest val loss.

**Projects:**
- Train MLP on MNIST to >98% accuracy with dropout and batch norm. Plot learning curves.
- Experiment: remove batch norm and show training instability.
- Visualize weight distributions across layers before and after batch norm with various initializations.

**Videos:**
- 🎬 **Andrej Karpathy — Building makemore Part 3 (BatchNorm deep dive)**: from `https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ`
- 🎬 **MIT 6.S191 (2025) — Full course playlist**: `https://www.youtube.com/watch?v=alfdI7S6wCY`
- 🎬 **StatQuest — Neural Networks Playlist**: `https://statquest.org/video_index.html`

---

#### ADVANCED — Custom Architectures, Attention, Mixed Precision

**What to learn:**
- **Residual connections (skip connections)**: `output = F(x) + x`. Allows gradients to flow directly through the network — enables training of very deep networks (ResNet).
- **Layer Normalization**: Like batch norm but normalized over the feature dimension (not batch). Used in Transformers because it works with variable-length sequences.
- **Mixed precision training**: Use float16 for most computations (faster, less memory) and float32 for loss scaling. `torch.cuda.amp.autocast()`. Crucial for training large models on limited GPU.
- **Gradient accumulation**: Simulate large batch sizes by accumulating gradients over multiple mini-batches before stepping the optimizer. Critical in IOAI's GPU-constrained environment.

**Projects:**
- Implement ResNet-18 from scratch in PyTorch. Train on CIFAR-10, reach >90%.
- Implement scaled dot-product self-attention from scratch.
- Train with and without mixed precision and compare training speed and memory.

**Videos:**
- 🎬 **Stanford CS231n (2025) — Lecture 1: CNN intro**: `https://www.youtube.com/watch?v=2fq9wYslV0A`
- 🎬 **Stanford CS231n — Backpropagation and Neural Networks**: `https://www.youtube.com/watch?v=25zD5qJHYsk`
- 🎬 **Andrej Karpathy — Let's build GPT from scratch**: `https://www.youtube.com/watch?v=kCc8FmEb1nY`

---

#### MASTER — Architecture Search, Fine-Tuning Large Models, Efficiency

**What to learn:**
- **Transfer learning strategies**: When to freeze layers, layer-wise learning rates (lower for early layers, higher for last layers), unfreezing schedules (gradually unfreeze from last layer backwards).
- **Fine-tuning BERT/ViT**: Attach a classification head to a pre-trained transformer, fine-tune with a very small learning rate (`2e-5` to `5e-5`), warm up for ~10% of steps, cosine decay.
- **Knowledge distillation**: Train a small "student" model to mimic a large "teacher" model. Student trained on soft labels (teacher's softmax outputs), not just hard labels.
- **LoRA (Low-Rank Adaptation)**: Fine-tune only small low-rank matrices added to frozen weight matrices. Drastically reduces trainable parameters. State-of-the-art for fine-tuning LLMs on limited compute.
- **Flash Attention**: IO-aware algorithm for faster attention. Reduces memory from O(N²) to O(N). Know it conceptually; use it in practice.

**Videos:**
- 🎬 **fast.ai — Practical Deep Learning for Coders (Lesson 1)**: `https://www.youtube.com/watch?v=8SF_h3xF3cE`
- 🎬 **fast.ai — Full course (9 lessons)**: `https://course.fast.ai`

---

## SUBJECT 5: COMPUTER VISION

### 👁️ 5.1 Convolutional Neural Networks

---

#### BEGINNER — Convolutions, Filters, Pooling

**What to learn:**
- **Convolution operation**: Slide a small filter (kernel) over the input image, computing dot products. A 3×3 filter detects local patterns (edges, textures). Output size: `(H - K + 2P) / S + 1`.
- **Why convolutions work**: Weight sharing (same filter applied everywhere) + local connectivity = far fewer parameters than a fully connected layer on images.
- **Pooling**: Max pooling takes the maximum value in each window → downsamples while keeping the most active features. Global average pooling takes the mean of each feature map → fixed-size output regardless of input size.
- **Common augmentations**: Horizontal flip, random crop, color jitter. These are done on-the-fly during training to prevent overfitting.

**Projects:**
- Implement 2D convolution from scratch (nested loops, then with `scipy.signal.convolve2d`).
- Train a simple CNN on MNIST from scratch in PyTorch — 2 conv layers + 2 FC layers. Target: >99%.

**Videos:**
- 🎬 **Stanford CS231n (2025) — CNN Architectures**: `https://www.youtube.com/watch?v=2fq9wYslV0A`
- 🎬 **3Blue1Brown — What is a convolution?**: `https://www.youtube.com/watch?v=KuXjwB4LzSA`
- 🎬 **MIT 6.S191 — Convolutional Neural Networks**: `https://www.youtube.com/watch?v=II4giR4vOOo`

---

#### INTERMEDIATE — Transfer Learning, ResNet, Data Augmentation

**What to learn:**
- **Pre-trained models**: Models trained on ImageNet (1.2M images, 1000 classes). Features learned are generic (edges, textures, shapes) and transfer well to new tasks.
- **ResNet**: Residual connections allow training of 18–152+ layer networks. ResNet-18/34 are fast; ResNet-50+ are more powerful. Standard choice for transfer learning baselines.
- **Fine-tuning strategy**: (1) Replace last FC layer with new head. (2) Freeze all layers, train head for 1–2 epochs. (3) Unfreeze all layers, train with small lr (1e-4 to 1e-5). (4) Use cosine LR decay.
- **Advanced augmentations**: Mixup (blend two images + labels), CutMix (cut and paste patches), Cutout/Random Erasing, Albumentations library.

**Projects:**
- Fine-tune ResNet-18 on a custom 10-class image dataset. Compare frozen vs full fine-tuning.
- Implement Mixup augmentation from scratch and show training accuracy benefit.

**Videos:**
- 🎬 **Stanford CS231n — Training Neural Networks**: schedule at `https://cs231n.stanford.edu/schedule.html`
- 🎬 **fast.ai Lesson 1 — Image Classification (practical, top-down)**: `https://www.youtube.com/watch?v=8SF_h3xF3cE`

---

#### ADVANCED — Detection, Segmentation, Adversarial Examples

**What to learn:**
- **Object Detection**: Predicts bounding boxes + class labels. YOLO: single-pass, anchor-based, very fast. DETR: Transformer-based, anchor-free, end-to-end trainable. Know IoU, NMS, mAP.
- **Semantic Segmentation**: Classify every pixel. U-Net: encoder-decoder with skip connections. Used in medical imaging, satellite imagery. FCN: fully convolutional for arbitrary input sizes.
- **Adversarial examples**: Small, imperceptible perturbations to inputs that fool classifiers. FGSM: `x_adv = x + ε * sign(∇_x L)`. PGD: iterative version of FGSM. **IOAI 2024 had a task on this!**
- **Adversarial training**: Add adversarial examples to training set. Makes model more robust but costs ~3x more compute.

**Projects:**
- Implement FGSM and PGD attacks on a trained CIFAR-10 ResNet. Measure accuracy drop.
- Train a U-Net on a segmentation dataset (Oxford Pets or similar). Visualize predictions.

**Videos:**
- 🎬 **Stanford CS231n Lecture 9 (Object Detection, Segmentation)**: from `https://cs231n.stanford.edu/schedule.html`
- 🎬 **MIT 6.S191 — Modern Computer Vision**: `https://www.youtube.com/watch?v=II4giR4vOOo`

---

#### MASTER — Vision Transformers, CLIP, Diffusion, Self-Supervised Vision

**What to learn:**
- **ViT (Vision Transformer)**: Split image into 16×16 patches, treat as tokens, apply standard Transformer encoder. Needs large datasets but scales beautifully.
- **CLIP**: Joint vision-language model. Trained with contrastive loss on image-text pairs. Creates a shared embedding space — text and image of the same concept land nearby.
- **Diffusion Models**: Forward process adds Gaussian noise gradually; reverse process learns to denoise. UNet backbone with time embedding. Stable Diffusion is based on latent diffusion (operates in compressed latent space for efficiency).
- **Self-supervised vision**: SimCLR, DINO, MAE (Masked Autoencoder). Pretrain without labels by predicting masked patches or maximizing embedding agreement under augmentations.

**Videos:**
- 🎬 **Stanford CS231n 2025 — Self-supervised and Generative Models**: `https://cs231n.stanford.edu/schedule.html`
- 🎬 **fast.ai Part 2 — Deep Learning Foundations to Stable Diffusion**: `https://course.fast.ai/Lessons/part2.html`
- 🎬 **Andrej Karpathy — Let's build GPT (attention mechanism applies equally to ViT)**: `https://www.youtube.com/watch?v=kCc8FmEb1nY`

---

## SUBJECT 6: NATURAL LANGUAGE PROCESSING

### 💬 6.1 NLP from Rules to Transformers

---

#### BEGINNER — Tokenization, TF-IDF, Classical NLP

**What to learn:**
- **Text preprocessing**: Lowercasing, punctuation removal, stopword removal, stemming (Porter), lemmatization (WordNet). Not always beneficial — context matters.
- **Tokenization**: Split text into tokens (words, subwords, or characters). Word tokenization is simple. Subword tokenization (BPE, WordPiece) handles OOV words and is used in all modern models.
- **Bag-of-Words**: Represent a document as a vector of word counts. Ignores word order. Simple but surprisingly effective for classification.
- **TF-IDF**: Weight words by how often they appear in a document (TF) relative to how common they are across all documents (IDF). Rare words that appear frequently in one doc are most informative.

**Projects:**
- Build a spam classifier with TF-IDF + Logistic Regression on SMS Spam dataset. Reach >97% accuracy.
- Implement bag-of-words vectorizer from scratch (no sklearn).

**Videos:**
- 🎬 **Stanford CS224N Lecture 1 — Word Vectors**: `https://www.youtube.com/watch?v=DzpHeXVSC5I`
- 🎬 **StatQuest — Word2Vec / Word Embedding**: `https://www.youtube.com/watch?v=viZrOnJclY0`

---

#### INTERMEDIATE — Word Embeddings, RNNs, Sequence Models

**What to learn:**
- **Word2Vec**: Two architectures: CBOW (predict word from context) and Skip-gram (predict context from word). Trained with noise-contrastive estimation. Learns semantic relationships: `king - man + woman ≈ queen`.
- **GloVe**: Global Vectors. Captures co-occurrence statistics. Pre-trained on Common Crawl (42B tokens). Often better than Word2Vec for downstream tasks.
- **Bias in embeddings**: Occupational stereotypes, gender/racial analogies. Debiasing via projection (remove gender direction). **IOAI 2024 sample task covered this explicitly.**
- **RNN**: Process sequences step-by-step, maintaining a hidden state. Suffers from vanishing gradients for long sequences.
- **LSTM**: Adds input/forget/output gates that control information flow. Handles longer dependencies. Used in machine translation before Transformers.
- **GRU**: Simplified LSTM with fewer gates. Slightly less powerful but faster.

**Projects:**
- Load pre-trained GloVe embeddings, compute analogies, and visualize with t-SNE.
- Implement a bias debiasing procedure on GloVe: (1) identify gender subspace with PCA, (2) project embeddings to remove it.
- Train a character-level LSTM language model to generate text.

**Videos:**
- 🎬 **Stanford CS224N Lecture 2 — Word Vectors and Optimization**: `https://www.youtube.com/watch?v=nBor4jfWwetQ`
- 🎬 **Stanford CS224N Lecture 6 — Vanishing Gradients, LSTMs**: `https://www.youtube.com/watch?v=Ba6Fn1-Jsfw`
- 🎬 **Andrej Karpathy — Building makemore (character language model)**: `https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ`

---

#### ADVANCED — Transformers, BERT, Fine-Tuning

**What to learn:**
- **Self-attention**: Each token attends to every other token with a learned attention weight. `Attention(Q,K,V) = softmax(QK^T / √d_k)V`. Captures long-range dependencies in O(1) layers.
- **Multi-head attention**: Run `h` parallel attention heads, concatenate outputs, project. Each head can attend to different aspects (syntax, coreference, etc.).
- **Positional encoding**: Adds order information (tokens are otherwise order-agnostic). Sinusoidal (original Transformer) or learned (BERT, GPT).
- **BERT**: Bidirectional encoder. Pre-trained with masked language modeling (predict 15% masked tokens) and next sentence prediction. Fine-tune by adding a task head.
- **GPT-style models**: Autoregressive decoder. Pre-trained by predicting next token. Fine-tuned with instruction tuning (RLHF, SFT).
- **Tokenizers**: BPE (Byte-Pair Encoding), WordPiece. Handle any word by splitting into subword units. Vocabulary size ~30K–50K.

**Projects:**
- Fine-tune BERT for sentiment classification on SST-2 using Hugging Face Trainer API.
- Implement scaled dot-product attention and multi-head attention from scratch in PyTorch.
- Build GPT-2-scale model following Karpathy's "Let's build GPT" tutorial.

**Videos:**
- 🎬 **Andrej Karpathy — Let's build GPT from scratch (3h)**: `https://www.youtube.com/watch?v=kCc8FmEb1nY`
- 🎬 **Stanford CS224N Lecture 3 — Backpropagation & NLP**: `https://www.youtube.com/watch?v=HnliVHU2g9U`
- 🎬 **Hugging Face — Fine-Tuning BERT Tutorial**: `https://www.youtube.com/watch?v=GsveHUpNFs8`
- 🎬 **MIT 6.S191 — Transformers and Attention**: `https://www.youtube.com/watch?v=II4giR4vOOo`

---

#### MASTER — LLMs, Instruction Tuning, RAG, Efficient Inference

**What to learn:**
- **Instruction tuning (SFT)**: Fine-tune pre-trained LLMs on (instruction, response) pairs. Makes them follow user intent.
- **RLHF**: Reinforcement Learning from Human Feedback. Train a reward model, then use PPO to optimize the LLM toward high-reward responses. Used in ChatGPT, Claude, Gemini.
- **RAG (Retrieval-Augmented Generation)**: Retrieve relevant documents from a knowledge base, prepend to context, generate a conditioned response. Reduces hallucination, keeps knowledge fresh.
- **Quantization**: Reduce model weights from float32 to int8 or int4. Drastically reduces memory at small accuracy cost. GGUF, GPTQ, AWQ are common quantization formats (relevant to your Ollama work).
- **LoRA / QLoRA**: Fine-tune quantized LLMs with LoRA adapters. Enables training 7B+ parameter models on consumer GPUs.

**Videos:**
- 🎬 **Hugging Face NLP Course**: `https://huggingface.co/learn/llm-course/chapter1/1`
- 🎬 **Hugging Face Transformers Tutorial Playlist**: `https://www.youtube.com/playlist?list=PLc2rvfiptPSTGfTp0nhC71ksTY1p5ooCW`
- 🎬 **fast.ai Part 2 — LLMs and generative models**: `https://course.fast.ai/Lessons/part2.html`

---

## SUBJECT 7: AUDIO / MULTIMODAL AI

### 🎵 7.1 Audio Understanding

---

#### BEGINNER — Signal Processing Basics, Spectrograms

**What to learn:**
- **Digital audio**: Sampled at 16kHz–44.1kHz. Each sample = amplitude value.
- **Fourier Transform**: Decomposes signal into frequency components. FFT = Fast Fourier Transform (efficient algorithm). Short-Time Fourier Transform (STFT) = FFT over sliding windows → gives time-frequency representation.
- **Spectrogram**: 2D image where X=time, Y=frequency, brightness=amplitude. CNNs trained on spectrograms can classify sounds.
- **Mel spectrogram**: Frequency axis warped to Mel scale (matches human hearing perception). MFCC = cepstral coefficients of mel spectrogram = compact audio feature vector.

**Projects:**
- Load an audio file with `librosa`, compute STFT, plot spectrogram.
- Compute MFCCs and compare between two different sounds visually.

**Videos:**
- 🎬 **MIT 6.S191 — Sequence Modeling and Audio**: `https://www.youtube.com/watch?v=II4giR4vOOo`

---

#### INTERMEDIATE — Audio Classification, Pre-trained Models

**What to learn:**
- **Audio classification pipeline**: Load audio → resample to 16kHz → compute mel spectrogram → treat as image → feed into CNN or Transformer.
- **Whisper**: OpenAI's speech-to-text model. Encoder-decoder Transformer. Fine-tunable on custom languages (e.g., Mongolian). Used in your STT work.
- **HuBERT/wav2vec2**: Self-supervised audio encoders. Pre-trained on unlabeled audio. Fine-tune on audio classification, emotion recognition, language ID.
- **Qwen-Audio**: Multimodal LLM that understands audio and text. Part of IOAI 2026 syllabus.

**Projects:**
- Fine-tune Whisper-small on a custom language dataset using Hugging Face.
- Build an audio classifier using mel spectrograms + ResNet-18 on UrbanSound8K dataset.

**Videos:**
- 🎬 **Hugging Face — Fine-tuning Whisper**: `https://huggingface.co/blog/fine-tune-whisper`
- 🎬 **MIT 6.S191 (2025) — Audio and multimodal AI segments**: `https://www.youtube.com/watch?v=alfdI7S6wCY`

---

## SUBJECT 8: GENERATIVE AI & IOAI PRACTICAL ROUND

### 🎨 8.1 Diffusion Models and Image Generation

---

#### BEGINNER — How Diffusion Works

**What to learn:**
- **Forward process**: Gradually add Gaussian noise to an image over T timesteps until it becomes pure noise. This is fixed (not learned).
- **Reverse process**: Learn to denoise — given a noisy image at timestep t, predict the noise. A UNet with time conditioning does this.
- **DDPM**: Denoising Diffusion Probabilistic Models. Original diffusion paper by Ho et al. 2020.
- **Guidance scale (CFG)**: Classifier-free guidance. Higher scale = more adherence to text prompt but less diversity.

**Projects:**
- Study and run a minimal DDPM implementation on MNIST-scale images.

**Videos:**
- 🎬 **MIT 6.S191 (2025/2026) — Generative Models**: `https://www.youtube.com/watch?v=alfdI7S6wCY`
- 🎬 **fast.ai Part 2 — Deep Learning Foundations to Stable Diffusion**: `https://course.fast.ai/Lessons/part2.html`

---

#### INTERMEDIATE — Stable Diffusion, Prompting, ControlNet

**What to learn:**
- **Latent Diffusion**: Run diffusion in a compressed latent space (encoded by a VAE), not pixel space. Much faster. Basis of Stable Diffusion.
- **Prompt engineering**: Positive prompts (what you want), negative prompts (what to avoid), style keywords, quality boosters.
- **ControlNet**: Add spatial conditioning (pose, depth, edges) to control image structure.
- **SDXL/FLUX**: Newer, higher-quality variants. Know them conceptually.

**Projects:**
- Build a storytelling visual pipeline: given a set of lyrics or a narrative, generate a consistent visual sequence.

**Videos:**
- 🎬 **fast.ai Part 2 — Stable Diffusion from scratch**: `https://course.fast.ai/Lessons/part2.html`

---

#### MASTER — Multimodal Systems, CLIP, Vision-Language Models

**What to learn:**
- **CLIP**: Contrastive Language-Image Pre-Training. Maps images and text to the same embedding space. Can do zero-shot classification.
- **LLaVA / GPT-4V style models**: Visual instruction tuning. Connect a vision encoder (ViT or CLIP) to an LLM via a projection layer.
- **Evaluation of generated content**: FID (Fréchet Inception Distance) for image quality, CLIP score for text-image alignment.

**Videos:**
- 🎬 **Stanford CS231n 2025 — Vision and Language Models**: `https://cs231n.stanford.edu/schedule.html`

---

## SUBJECT 9: CONTEST EXECUTION SKILLS

### 🏆 9.1 IOAI-Specific Strategies

---

#### BEGINNER — Template Notebook, EDA, Baseline in 1h

**What to build:**

Design and practice a **personal contest notebook template** with the following structure:
```
1. IMPORTS AND CONFIG
2. DATA LOADING (with shape/dtype checks)
3. EDA (5–10 quick plots: distributions, correlations, class balance, sample images if CV)
4. PREPROCESSING (scaling, encoding, splits)
5. BASELINE MODEL (simplest possible: logistic reg, linear, or random forest)
6. IMPROVEMENTS (iterate from baseline, log every experiment)
7. ENSEMBLE / POST-PROCESSING
8. FINAL PREDICTION + SUBMISSION
```

**Practice drill:** Pick any Kaggle dataset, set a timer for 60 min, and hit the baseline structure fully.

---

#### INTERMEDIATE — Experiment Tracking, Ablations, Time Management

**What to learn:**
- Log every experiment with: model name, hyperparameters, validation score, and short note.
- Plan ablations: change one thing at a time. Never change 3 things simultaneously or you cannot attribute improvement.
- Time boxing: 20% EDA + baseline, 60% model iteration, 20% cleanup and submission.

---

#### ADVANCED — IOAI Task Re-implementation

**What to do:**
- Download all **IOAI 2024 Task PDFs and solution notebooks** from `https://ioai-official.org/2024-tasks/`
- Read **Team Japan's at-home write-up**: `https://zenn.dev/chizuchizu/articles/b556a5b6ad6019`
- Read **community solution hub**: `https://ioai-writeup.github.io`
- For each task: try to solve it FIRST without reading the solution. Compare after.
- Note: IOAI tasks span ML (tabular), NLP (text classification, embeddings, language model training), CV (image classification, adversarial), and Practical (image/video generation).

---

#### MASTER — Full Mock Contest Simulation

**Protocol:**
1. Set up Bohrium-like environment (Jupyter, offline except approved docs).
2. Pick 2–3 tasks from IOAI 2024 or national olympiad sources.
3. Work for exactly 8 hours. No cheating with external resources beyond approved docs.
4. After: debrief — what you scored, what top solutions scored, what specific skill the gap was.
5. Repeat every 3 weeks from Phase 4 onwards.

**Resources:**
- IOAI 2024 Tasks: `https://ioai-official.org/2024-tasks/`
- Awesome IOAI Tasks Repo: `https://github.com/open-cu/awesome-ioai-tasks`
- Romania OAI Solutions: `https://github.com/stefanasandei/roai-solved`
- IOAI Writeup Hub: `https://ioai-writeup.github.io`

---

## MASTER VIDEO REFERENCE TABLE

| Subject | Level | Video / Resource | URL |
|---|---|---|---|
| Linear Algebra | Beginner–Intermediate | 3Blue1Brown — Essence of Linear Algebra | https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab |
| Calculus | Beginner | 3Blue1Brown — Essence of Calculus | https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr |
| Neural Networks (theory) | Beginner | 3Blue1Brown — Neural Networks series | https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi |
| Backpropagation (visual) | Intermediate | 3Blue1Brown — Backpropagation | https://www.youtube.com/watch?v=Ilg3gGewQ5U |
| Backpropagation (calculus) | Intermediate | 3Blue1Brown — Backprop Calculus | https://www.youtube.com/watch?v=tIeHLnjs5U8 |
| Classical ML (all topics) | All levels | StatQuest — ML Playlist | https://statquest.org/video_index.html |
| Classical ML (formal) | Intermediate–Advanced | Stanford CS229 — Full Course | https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU |
| Deep Learning | Beginner–Master | Andrej Karpathy — Zero to Hero | https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ |
| Deep Learning (applied) | Intermediate | MIT 6.S191 (2026) | https://www.youtube.com/watch?v=II4giR4vOOo |
| Deep Learning (applied) | Intermediate | MIT 6.S191 (2025) | https://www.youtube.com/watch?v=alfdI7S6wCY |
| Computer Vision | All levels | Stanford CS231n (2025) | https://www.youtube.com/watch?v=2fq9wYslV0A |
| NLP + Word Vectors | Intermediate | Stanford CS224N Lecture 1 | https://www.youtube.com/watch?v=DzpHeXVSC5I |
| NLP + Optimization | Intermediate | Stanford CS224N Lecture 2 | https://www.youtube.com/watch?v=nBor4jfWwetQ |
| NLP + Backprop | Intermediate | Stanford CS224N Lecture 3 | https://www.youtube.com/watch?v=HnliVHU2g9U |
| NLP + LSTMs/Vanishing Grad | Intermediate | Stanford CS224N Lecture 6 | https://www.youtube.com/watch?v=Ba6Fn1-Jsfw |
| Transformers (GPT) | Advanced–Master | Karpathy — Let's Build GPT | https://www.youtube.com/watch?v=kCc8FmEb1nY |
| HuggingFace Fine-tuning | Advanced | HuggingFace BERT Tutorial | https://www.youtube.com/watch?v=GsveHUpNFs8 |
| HuggingFace (playlist) | Advanced | HuggingFace Tutorials Playlist | https://www.youtube.com/playlist?list=PLc2rvfiptPSTGfTp0nhC71ksTY1p5ooCW |
| Practical DL | Intermediate–Advanced | fast.ai Part 1 | https://course.fast.ai |
| Diffusion Models | Advanced–Master | fast.ai Part 2 (Stable Diffusion) | https://course.fast.ai/Lessons/part2.html |
| Python & AI | Beginner | Harvard CS50 AI with Python | https://www.youtube.com/watch?v=5NgNicANyqM |
| Probability (ML context) | Beginner | StatQuest — Probability Basics | https://www.youtube.com/watch?v=uzkc-qNVoOk |
| LLM Course | Master | Hugging Face LLM Course | https://huggingface.co/learn/llm-course/chapter1/1 |

---

## PHASE-TO-SUBJECT MAPPING (Quick Reference)

| Phase | Duration | Main Subjects from This File |
|---|---|---|
| Phase 0 (Baseline) | Wks 1–2 | S1.1 Beginner, S3 Beginner diagnostic |
| Phase 1 (Math + Python) | Wks 3–10 | S1.1–1.3 Beginner→Intermediate, S2.1–2.2 Beginner→Intermediate |
| Phase 2 (Core ML) | Wks 11–22 | S3.1 Beginner→Advanced, S3.2 Beginner→Intermediate |
| Phase 3 (DL/CV/NLP) | Wks 23–38 | S4.1 Beginner→Advanced, S5.1 Beginner→Intermediate, S6.1 Beginner→Advanced |
| Phase 4 (IOAI Practice) | Wks 39–48 | S5.1 Advanced→Master, S6.1 Advanced→Master, S7, S9 Advanced |
| Phase 5 (Final Polish) | Wks 49–52+ | S8 All, S9 Master, all contest execution skills |
