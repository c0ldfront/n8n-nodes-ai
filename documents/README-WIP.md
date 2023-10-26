![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-ai

Enhance your [n8n](https://n8n.io) workflow capabilities with `n8n-nodes-ai`! This package offers a collection of nodes designed specifically for AI, databases, langchain, and much more.

## 🌟 Highlights

- **Comprehensive AI Models**: Integrate state-of-the-art AI models seamlessly into your n8n workflows.
- **Database Utilities**: Optimize your database operations with specialized nodes.
- **Langchain Integration**: Easily interface with langchain using dedicated nodes.
- **Active Development**: Regular updates with new features and improvements.

## 🧠 AI Models

<details>
  <summary>Click to expand the list of AI models</summary>

  | Model Name | Description | Category |
  |:----------:|:-----------:|:--------:|
  | Model1    | Description for Model1 | Image Recognition |
  | Model2    | Description for Model2 | NLP |
  | Model3    | Description for Model3 | Time Series Analysis |
  ... (Add more models as needed)

</details>

## 🖼️ Showcase

Experience the power and flexibility of `n8n-nodes-ai` through our showcases:

![Showcase Image](https://via.placeholder.com/800x400?text=Your+Showcase+Image+Here)

Stay tuned for more examples, demos, and showcases in future updates!



## 🚀 Getting Started

1. Familiarize yourself with the range of nodes available in this package by exploring the `/nodes` directory. Each node has been crafted to address specific AI and database functionalities seamlessly.
2. Dive into the node documentation within the package to understand configurations, settings, and best practices for each node.
3. Check for compatibility: Ensure your n8n setup meets the version requirements specified in this package's `package.json`.
4. Optimize your workflows! Integrate `n8n-nodes-ai` nodes directly into your n8n workflows to expand capabilities and automation.
5. Need a custom touch? For tailored functionalities, consider either forking this package or contributing directly to enhance its feature set.
6. To ensure you leverage the most up-to-date features and optimizations, regularly visit the [npm package page](https://www.npmjs.com/package/n8n-nodes-ai) for updates.


## 🖥️ Installing via n8n Community UI

While `n8n-nodes-ai` aims to be included in future n8n releases, you can currently install and use its features directly via n8n's community node integration. This allows you to leverage its latest features and models that may not yet be available in the default n8n package.

### Community Node Installation (Recommended)

1. Navigate to `Settings` within your n8n instance.
2. Choose the `Community Nodes` section.
3. Click on `Install`.
4. In the field labeled `Enter npm package name`, type `n8n-nodes-ai`.
5. Acknowledge the risks associated with installing community nodes by selecting `I understand the risks of installing unverified code from a public source`.
6. Finally, click on `Install`.

Once installed, `n8n-nodes-ai` will be available alongside other nodes in your n8n instance. You can easily find and integrate them within your workflows using the Nodes panel's search functionality.

## 🐳 Installing via Docker

If you're running `n8n` within a Docker container, you can integrate the `n8n-nodes-ai` nodes by extending the official n8n Docker image. Here's how:

### Step-by-Step Guide

1. **Dockerfile Creation:** Begin by creating a Dockerfile to extend the n8n image:

    ```Dockerfile
    FROM n8nio/n8n

    # Install the n8n-nodes-ai package
    RUN npm install -g n8n-nodes-ai
    ```

2. **Building the Image:** Navigate to the directory containing your Dockerfile and build your custom image:

    ```bash
    docker build -t custom-n8n .
    ```

3. **Run n8n with Custom Nodes:** Once the image is built, run n8n using your custom image:

    ```bash
    docker run -it --rm \
      --name n8n \
      -p 5678:5678 \
      custom-n8n
    ```

4. **Access n8n:** Open your web browser and navigate to `http://localhost:5678/`. You should now see `n8n-nodes-ai` nodes available alongside the default nodes in the n8n editor.

5. Start integrating the powerful capabilities of `n8n-nodes-ai` into your n8n workflows!

**Note:** Always ensure your Docker setup and configurations align with your deployment environment's specifics. This guide provides a general approach suitable for local development and testing.


## ⚙️ Installing via Local CLI

For those who prefer command-line installations or are looking to integrate `n8n-nodes-ai` into their development workflows, follow the steps below:

1. Ensure you have `n8n` already installed. If not, you can install it globally:
    ```bash
    npm install n8n -g
    ```

2. With `n8n` set up, you can now install the `n8n-nodes-ai` package:
    ```bash
    npm install n8n-nodes-ai
    ```

3. Once the installation completes, you'll have the `n8n-nodes-ai` nodes available to use in your n8n instance.

4. To verify the nodes' availability, start your n8n instance and search for the nodes within the n8n editor.

5. Begin crafting and optimizing your workflows with the expansive capabilities that `n8n-nodes-ai` brings to your automation suite.

Remember, for any custom configurations or node-specific settings, always refer back to the node documentation within the `n8n-nodes-ai` package.

## 🎓 Tutorials & Use Cases

Discover the power and versatility of `n8n-nodes-ai` through our curated list of tutorials, demonstrations, and real-world use cases. These resources are designed to help you get the most out of the nodes provided by this package, whether you're a beginner or an advanced user.

### **Beginner's Guides:**

- **Getting Started with `n8n-nodes-ai`:**
  - [Link to Tutorial](#): A step-by-step guide to introduce you to the basics of our nodes and how to integrate them into your workflows.
  
- **Understanding AI Nodes:**
  - [Link to Tutorial](#): Dive deep into the AI functionalities provided and understand their applications.

### **Advanced Techniques:**

- **Optimizing Your Workflows with `n8n-nodes-ai`:**
  - [Link to Tutorial](#): Learn the tips and tricks to maximize efficiency and automation in your n8n workflows using our nodes.

- **Customizing Nodes for Specific Needs:**
  - [Link to Tutorial](#): A guide for those looking to tailor the nodes for specialized applications.

### **Real-World Use Cases:**

- **E-commerce Product Recommendations with AI:**
  - [Link to Case Study](#): See how businesses leverage `n8n-nodes-ai` to enhance their product recommendation systems.

- **Language Processing in Customer Support Automation:**
  - [Link to Case Study](#): A detailed look at automating customer interactions using the AI capabilities of our nodes.

We're continually updating this section with more tutorials and use cases. If you've developed a tutorial or want to share your use case utilizing `n8n-nodes-ai`, [get in touch with us](#) or [submit it to our community forum](#) (replace `#` with appropriate links).



## 📚 Resources

To bolster your understanding and expertise in leveraging the capabilities of `n8n-nodes-ai`, we've compiled a list of essential resources:

- **n8n:**
  - [Official Documentation](https://docs.n8n.io/): Comprehensive guide to understanding and utilizing n8n.
  - [Node Creation Guide](https://docs.n8n.io/integrations/creating-nodes/): Detailed documentation on developing custom nodes within n8n.
  - [n8n Community Forum](https://community.n8n.io/): A platform for discussions, questions, and collaboration with other n8n users.

- **Langchain:**
  - [Official Website](https://langchain.io/): Discover the power and versatility of langchain.
  - [Developer Documentation](#): Access technical documentation and guides for langchain integration (replace `#` with the actual link if available).
  - [Langchain Community](#): Engage with other langchain enthusiasts and experts (replace `#` with the actual link if available).

- **Supabase:**
  - [Official Website](https://supabase.io/): The open-source Firebase alternative.
  - [Supabase Documentation](https://supabase.io/docs): In-depth guides and tutorials to get started with Supabase.
  - [Supabase GitHub Repository](https://github.com/supabase/supabase): Explore the codebase, raise issues, or contribute to its growth.

Utilizing these resources will provide a robust foundation and foster continuous learning as you integrate and develop with `n8n-nodes-ai`.

## 🛣️ Roadmap

As we strive to continually evolve and enhance `n8n-nodes-ai`, here's a glimpse of what's on the horizon. This roadmap represents our commitment to pushing boundaries and delivering the best for our community.

### Upcoming Features:

- **Feature A:** Placeholder description for the first upcoming feature.
- **Feature B:** Placeholder description for the second upcoming feature.
- **Enhancement C:** Placeholder description for a planned enhancement.
- **Integration D:** Placeholder details on a new integration in the pipeline.

### Under Consideration:

- **Idea X:** Placeholder for an idea that's currently being explored.
- **Idea Y:** Another placeholder for a potential feature or enhancement.

### Feedback & Suggestions:

We're always eager to hear from our community. If you have ideas or suggestions that can help shape the future of `n8n-nodes-ai`, please [open an issue](#) on our GitHub repository or [join our community forum](#) (replace `#` with appropriate links).

Your insights and feedback play a crucial role in steering this project's direction. Let's build the future of `n8n-nodes-ai` together!



## 📜 Changelog / Revision History

Keep track of all the changes, enhancements, and fixes made to `n8n-nodes-ai` in this section.

### [Unreleased]

- Added new features XYZ.
- Improved performance of ABC node.

### [1.0.1] - 2023-10-25
- Fixed minor bugs in DEF node.
- Updated documentation for clarity.

### [1.0.0] - 2023-10-24
- Initial release of `n8n-nodes-ai`.
- Introduced models: Model1, Model2, Model3, ...

---

Future updates will be documented here. Stay updated by checking back frequently or watching our [npm package page](https://www.npmjs.com/package/n8n-nodes-ai).



## 📜 License

[MIT](https://github.com/c0ldfront/n8n-nodes-ai/blob/master/LICENSE.md)
